import React, { Component } from 'react';
import Layout from '../hoc/Layout';
import TextInput from '../Components/TextInput';
import axios from '../hoc/axios-baseurl';

class UserEdit extends Component {
    state = {
        email: null,
        pass: ''
    }

    componentDidMount(){
        this.loadUserHandler();
    }

    loadUserHandler = () => {
        const self = this;
        let id = this.props.match.params.id
        axios.get('/users/view/' + id)
            .then(function (response) {
                const user = response.data
                console.log("User Edit: ", user);
                self.setState({ email: user.email });
            
            })
            .catch(function (error) {
                console.log("Get Error User:" + error.message);
            })
            .finally(function () { });
    }

    onSubmitHandler = () =>{

    }

    render() {
        return (
            <Layout title="User Edit">
                <TextInput
                    htmlFor="email"
                    label="Email"
                    inputType="email" id="email" name="email"
                    inputValue={this.state.email}
                />
                <TextInput
                    htmlFor="Password"
                    label="Password"
                    inputType="password" id="password" name="password"
                    inputValue={this.state.pass}
                />
                <div className="form-controls">
                    <button className="btn btn-danger" type="button" onClick={this.onSubmitHandler}>Edit User</button>
                </div>
            </Layout>
        );
    }
}

export default UserEdit;