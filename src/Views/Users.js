import React, { Component } from 'react';
import SideBar from '../Views/Sidebar';
import SmartList from '../hoc/SmartList';
import { sideList, slUserHeaders } from '../Helpers/RoutersConfig';
import Navigation from './Navigation';
import Header from '../Components/Header';
import axios from '../hoc/axios-baseurl';

class Users extends Component {

    state = {
        users: []
    }

    loadUsersHandler = () => {
        const self = this;
        axios.get('/users')
            .then(function (response) {
                const users = response.data;
                const updateUsers = users.map(user => {
                    console.log(user);
                    return {
                        ...user
                    }
                })
                self.setState({ users: updateUsers });
            })
            .catch(function (error) {
                console.log('Get Users Error: ' + error.message);
            })
            .finally(function () {

            }
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

};

export default Users;