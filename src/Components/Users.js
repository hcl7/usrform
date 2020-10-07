import React, { Component } from 'react';
import Header from '../Components/Header';
import SideBar from '../Views/Sidebar';
import axios from '../hoc/axios-baseurl';
import { sideList, slUserHeaders, formatDate } from '../Helpers/RoutersConfig';
import SmartList from '../hoc/SmartList';
import Navigation from '../Views/Navigation';
import Alert from '../Helpers/Alert';
import Spinner from '../Helpers/Spinner';
import { connect } from 'react-redux';

class Users extends Component {

    state = {
        users: [],
        selecteUser: [],
        loading: true
    }

    loadUsersHandler = () => {
        const self = this;
        axios.get('/users')
            .then(function (response) {
                const users = response.data;
                const updateUsers = users.map(user => {
                    console.log('User: ', user);
                    user.created = formatDate(user.created);
                    user.modified = formatDate(user.modified);
                    return {
                        ...user
                    }
                })
                self.setState({ users: updateUsers, loading: false });
            })
            .catch(function (error) {
                console.log('Get Users Error: ' + error.message);
            })
            .finally(function () { }
            );
    }

    componentDidMount() {
        this.loadUsersHandler();
    }

    render() {
        let spinner = null;
        if (this.state.loading) {
            spinner = <Spinner />;
        }
        else {
            spinner = (
                <SmartList
                    smartListHeaders={slUserHeaders}
                    smartListContents={this.state.users}
                    view={'/users/view'}
                    edit={'/users/edit'}
                    delete={'/users/delete'}
                    where="id"
                />
            );
        }
        return (
            <div className="container">
                <Navigation />
                <div className="row" style={{ marginTop: '60px' }}>
                    <div className="col-sm-4">
                        <SideBar sideList={sideList} />
                    </div>
                    <div className="col-sm-8">
                        <Header header="Users" />
                        {this.props.userResponseMessage? <Alert mode="success" msg={this.props.userResponseMessage} /> : null}
                        {spinner}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state =>{
    return {
        userResponseMessage: state.responseMessage
    }
}

export default connect(mapStateToProps)(Users);