import React, { Component } from 'react';
import SideBar from '../Views/Sidebar';
import SmartList from '../hoc/SmartList';
import { sideList, slUserHeaders } from '../Helpers/RoutersConfig';
import axios from '../hoc/axios-baseurl';

class Users extends Component {

    state = {
        users: []
    }

    loadUsers = () => {
        const self = this;
        axios.get('/users')
            .then(function (response) {
                const users = response.data;
                const updateUsers = users.map(user=>{
                    console.log(user);
                    return {
                        ...user
                    }
                });
                self.setState({users: updateUsers});
                //console.log('Users: ' + updateUsers);
            })
            .catch(function (error) {
                console.log('Get Error: ' + error.message);
            })
            .finally(function () {
                
            }
        );
    }

    componentDidMount(){
        this.loadUsers();
    }

    render() {
        return (
            <div className="container-sm">
                <div className="row">
                    <div className="col-sm-4">
                        <SideBar sideList={sideList} />
                    </div>
                    <div className="col-sm-8">
                        <SmartList
                            smartListHeaders={slUserHeaders}
                            smartListContents={this.state.users}
                            view={'/Users/view'}
                            edit={'/Users/edit'}
                            delete={'/Users/delete'}
                            id="id"
                        />
                    </div>
                </div>
            </div>
        );
    }

};

export default Users;