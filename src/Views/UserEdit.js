import React, { Component } from 'react';
import Layout from '../hoc/Layout';
import Input from '../Components/Input';
import axios from '../hoc/axios-baseurl';
import Alert from '../Helpers/Alert';

class UserEdit extends Component {
    state = {
        id: '',
        email: '', emailValid: false,
        password: '', passValid: false,
        formValid: false,
        errorMsg: {},
        posted: true,
        error: []
    }

    validateForm = () => {
        const { passValid, emailValid } = this.state;
        this.setState({ formValid: passValid && emailValid });
    }

    //Password state update;
    updatePass = (pass) => {
        this.setState({ password: pass }, this.validatePass);
    }

    validatePass = () => {
        const { password } = this.state;
        let passValid = true;
        let errorMsg = { ...this.state.errorMsg };

        // pass validate regex;
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)) {
            passValid = false;
            errorMsg.password = "Password must have Capital Letter, 8 chars minimum, Numbers and Chars!";
        }

        this.setState({ passValid, errorMsg }, this.validateForm);
    }

    // email state update;
    updateEmail = (email) => {
        this.setState({ email }, this.validateEmail);
    }

    validateEmail = () => {
        const { email } = this.state;
        let emailValid = true;
        let errorMsg = { ...this.state.errorMsg };
        //email validate regex;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailValid = false;
            errorMsg.email = "Invalid email format";
        }

        this.setState({ emailValid, errorMsg }, this.validateForm);
    }

    componentDidMount() {
        this.loadUserHandler();
    }

    loadUserHandler = () => {
        const self = this;
        let id = this.props.match.params.id
        axios.get('/users/view/' + id)
            .then(function (response) {
                const user = response.data
                self.setState({ email: user.email, id: user.id});
                console.log('User email: ', self.state.email);
            })
            .catch(function (error) {
                console.log("Get Error User:" + error.message);
            })
            .finally(function () { });
    }

    onSubmitHandler = () => {
        const self = this;
        const userPost = self.state;
        let id = this.props.match.params.id;
        axios.post('/users/edit/' + id, userPost)
            .then(response => {
                console.log('post:', response.data.message);
                self.setState({posted: true, error: response.data.message});
                this.props.history.push({
                    pathname: '/users/',
                    statusMessage: this.state.error
                });
            })
            .catch(function (error){
                console.log('Post Error: ' + error.message);
                self.setState({posted: false, error: error.message});
            })
            .finally(function () { });
    }

    render() {
        return (
            <Layout title="User Edit">
                {!this.state.posted ? <Alert mode="success" msg={this.state.error} /> : null}
                <Input
                    htmlFor="email"
                    label="Email"
                    valid={this.state.emailValid}
                    message={this.state.errorMsg.email}
                    elementType="input"
                    type="email" id="email" name="email"
                    value={this.state.email}
                    changed={(e) => this.updateEmail(e.target.value)}
                />
                <Input
                    htmlFor="Password"
                    label="Password"
                    valid={this.state.passValid}
                    message={this.state.errorMsg.password}
                    elementType="input"
                    type="password" id="password" name="password"
                    value={this.state.password}
                    changed={(e) => this.updatePass(e.target.value)}
                />
                <div className="form-controls">
                    <button className="btn btn-danger" type="button" onClick={this.onSubmitHandler}>Edit User</button>
                </div>
            </Layout>
        );
    }
}

export default UserEdit;