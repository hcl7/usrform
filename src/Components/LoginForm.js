import React from 'react';
import '../App.css';
import Header from './Header';
import TextInput from './TextInput';
import axios from '../hoc/axios-baseurl';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '', emailValid: false,
      password: '', passValid: false,
      formValid: false,
      errorMsg: {}
    }
  }

  validateForm = () => {
    const {passValid, emailValid} = this.state;
    this.setState({formValid: passValid && emailValid});
  }

  //Password state update;
  updatePass = (pass) => {
    this.setState({password:pass}, this.validatePass);
  }

  validatePass = () => {
    const {password} = this.state;
    let passValid = true;
    let errorMsg = {...this.state.errorMsg};

    // pass validate regex;
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password))
    {
        passValid = false;
        errorMsg.password = "Password must have Capital Letter, 8 chars minimum, Numbers and Chars!";
    }

    this.setState({passValid, errorMsg}, this.validateForm);
  }

  // email state update;
  updateEmail = (email) => {
    this.setState({email}, this.validateEmail);
  }

  validateEmail = () => {
    const {email} = this.state;
    let emailValid = true;
    let errorMsg = {...this.state.errorMsg};
    //email validate regex;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      emailValid = false;
      errorMsg.email = "Invalid email format";
    }

    this.setState({emailValid, errorMsg}, this.validateForm);
  }

  routeOnSubmit(){
    if (this.state.errorMsg === 0){
      this.props.history.push("/articles");
      console.log('state value: '+this.state.errorMsg);
    }
    if (this.state.errorMsg === 1){
      this.props.history.push("/login");
      console.log('state value: '+this.state.errorMsg);
    }
  }

  onSubmitHandler = () => {
    // Make a request for a user with a argument
    const this_ = this;
    
    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    // axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
    // axios.defaults.headers.common['Access-Control-Allow-Methods'] = "POST, OPTIONS"

    axios.post('/users/login', this.state)
      .then(function (response) {
        // handle success
        this_.setState({errorMsg:response.data.error})
        console.log('Response: '+response.data.message);
        this_.routeOnSubmit();
      })
      .catch(function (error) {
        // handle error
        console.log('Post Error: ' + error.message);
      })
      .finally(function () {
        // always executed
      });
  }
  
  render() {
    return (
      <div className="container">
        <Header header="Login" />
        <div className="row">
          <form action="#" id="js-form">
          <TextInput
              htmlFor="email"
              label="Email"
              inputValid={this.state.emailValid}
              errorMsg={this.state.errorMsg.email}
              inputType="email" id="email" name="email"
              inputValue={this.state.email}
              changed={(e) => this.updateEmail(e.target.value)}
            />
            <TextInput
              htmlFor="Password"
              label="Password"
              inputValid={this.state.passValid}
              errorMsg={this.state.errorMsg.password}
              inputType="password" id="password" name="password"
              inputValue={this.state.password}
              changed={(e) => this.updatePass(e.target.value)}
            />
            <div className="form-controls">
              <button className="btn btn-primary" type="button" onClick={this.onSubmitHandler} disabled={!this.state.formValid} >Login</button>
            </div>
          </form>
        </div>
        <div className="row">
          <div>{"{"+this.state.email+"}"}</div>
          <div>{"{"+this.state.password+"}"}</div>
        </div>
      </div>
    );
  }
}

export default LoginForm;