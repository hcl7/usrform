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
import * as actionCreator from '../store/actions';
import swal from 'sweetalert';

class Users extends Component {

    state = {
        users: [],
        loading: true,
        error: ''
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
        if (this.props.userResponseMessage) {
            setTimeout(function () {
                this.props.clearState();
            }.bind(this), 3000);
        }
    }

    onDeleteHandler = (id) => {
        const self = this;
        console.log(id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this User!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.post('/users/delete/' + id)
                    .then(function (response) {
                        self.setState({ error: response.data.message });
                        swal(self.state.error, {
                            icon: "success",
                            text: response.data.message
                        });
                        self.loadUsersHandler();
                    })
                    .catch(function (error) {
                        console.log(error.message);
                        self.setState({ error: error.message });
                        swal(self.state.error, {
                            icon: "error",
                            text: error.message
                        });
                    })
                    .finally(function () { }
                );
            }
            else {
                swal("Your User is Safe!", {
                    icon: "info"
                });
            }
        });
    }

    render() {
        let users = null;
        if (this.state.loading) {
            users = <Spinner />;
        }
        else {
            users = (
                <SmartList
                    smartListHeaders={slUserHeaders}
                    smartListContents={this.state.users}
                    view={'/users/view'}
                    edit={'/users/edit'}
                    clicked={this.onDeleteHandler.bind(this)}
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
                        {this.props.userResponseMessage ? <Alert mode="success" msg={this.props.userResponseMessage} /> : null}
                        {users}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userResponseMessage: state.responseMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearState: () => dispatch(actionCreator.clearState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);