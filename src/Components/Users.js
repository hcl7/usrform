import React, { Component } from 'react';
import Header from '../Components/Header';
import SideBar from '../Views/Sidebar';
import axios from '../hoc/axios-baseurl';
import { sideList, slUserHeaders, formatDate } from '../Helpers/RoutersConfig';
import SmartList from '../hoc/SmartList';
import Navigation from '../Views/Navigation';

class Users extends Component {

    state = {
        users: [],
        selecteUser: []
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
                self.setState({ users: updateUsers });
            })
            .catch(function (error) {
                console.log('Get Users Error: ' + error.message);
            })
            .finally(function () {}
        );
    }

    componentDidMount() {
        this.loadUsersHandler();
    }

    render() {
        return (
            <div className="container">
                <Navigation />
                <div className="row" style={{marginTop: '60px'}}>
                    <div className="col-sm-4">
                        <SideBar sideList={sideList} />
                    </div>
                    <div className="col-sm-8">
                        <Header header="Users" />
                        <SmartList
                            smartListHeaders={slUserHeaders}
                            smartListContents={this.state.users}
                            view={'/users/view'}
                            edit={'/users/edit'}
                            delete={'/users/delete'}
                            where="id"
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default Users;