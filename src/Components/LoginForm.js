import React from 'react';
import '../App.css';
import Header from './Header';
import Input from './Input';
import SideBar from '../Views/Sidebar';
import axios from '../hoc/axios-baseurl';
import Navigation from '../Views/Navigation';
import { sideList } from '../Helpers/RoutersConfig';

class LoginForm extends React.Component {
  
  state = {
    email: '', emailValid: false,
    password: '', passValid: false,
    formValid: false,
    errorMsg: {}
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

  routeOnSubmit() {
    if (this.state.errorMsg === 0) {
      this.props.history.push("/articles");
      console.log('state value: ' + this.state.errorMsg);
    }
    if (this.state.errorMsg === 1) {
      this.props.history.push("/login");
      console.log('state value: ' + this.state.errorMsg);
    }
  }

  onSubmitHandler = () => {
    // Make a request for a user with a argument
    const self = this;
    axios.post('/users/login', this.state)
      .then(function (response) {
        self.setState({ errorMsg: response.data.error })
        console.log('Response: ' + response.data.message);
        self.routeOnSubmit();
      })
      .catch(function (error) {
        console.log('Post Error: ' + error.message);
      })
      .finally(function () {});
  }

  render() {
    return (
      <div className="container">
        <Navigation />
        <div className="row justify-content-center" style={{ marginTop: '60px' }}>
          <div className="col-sm-4">
            <SideBar sideList={sideList} />
          </div>
          <div className="col-sm-8">
            <Header header="Login" />
            <form action="#" id="js-form">
              <Input
                htmlFor="email"
                label="Email"
                placeholder="Enter Email"
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
                <button className="btn btn-primary" type="button" onClick={this.onSubmitHandler} disabled={!this.state.formValid} >Login</button>
              </div>
            </form>
            <div className="row justify-content-center">
              <div>{"{" + this.state.email + "}"}</div>
              <div>{"{" + this.state.password + "}"}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;