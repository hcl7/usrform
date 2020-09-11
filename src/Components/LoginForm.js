import React from 'react';
import '../App.css';
import Header from './Header';

import axios from 'axios';

function ValidationMessage(props) {
  if (!props.valid) {
    return(
      <div className='error-msg'>{props.message}</div>
    )
  }
  return null;
}

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
    this.setState({email}, this.validateEmail)
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
      this.props.history.push("/articles/indexAPI");
      console.log('state value: '+this.state.errorMsg);
    }
    if (this.state.errorMsg === 1){
      this.props.history.push("/login");
      console.log('state value: '+this.state.errorMsg);
    }
  }

  handleSubmit = () => {
    // Make a request for a user with a argument
    const this_ = this;
    axios.post('http://usrlogin.local/users/loginAPI', this.state)
      .then(function (response) {
        // handle success
        //console.log('Response: '+response.data.id+';'+response.data.email+';'+response.data.created);
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
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <ValidationMessage valid={this.state.emailValid} message={this.state.errorMsg.email} />
              <input type="email" id="email" name="email" className="form-control"
              value={this.state.email} onChange={(e) => this.updateEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <ValidationMessage valid={this.state.passValid} message={this.state.errorMsg.password} />
              <input type="password" id="password" name="password" className="form-control"
              value={this.state.password} onChange={(e) => this.updatePass(e.target.value)} />
            </div>
            <div className="form-controls">
              <button className="btn btn-primary" type="button" onClick={this.handleSubmit} disabled={!this.state.formValid} >Login</button>
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