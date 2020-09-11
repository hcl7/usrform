import React from 'react';
import '../App.css';
import Header from './Header';
import ValidationMessage from './ValidationMessage';

import axios from 'axios';

class SignupForm extends React.Component {
  state = {
    email: '', emailValid: false,
    password: '', passValid: false,
    cfpassword: '', cfpassValid: false,
    formValid: false,
    errorMsg: {}
  }

  validateForm = () => {
    const {passValid, cfpassValid, emailValid} = this.state;
    this.setState({formValid: passValid && cfpassValid && emailValid});
  }

  //Password validation;
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
        errorMsg.password = "Password should start with Capital Letter, should be 8 chars minimum, Must Contain Numbers, Chars!";
    }

    this.setState({passValid, errorMsg}, this.validateForm);
  }

    //Confirm Password validation;
    updateCfPass = (cfpass) => {
      this.setState({cfpassword:cfpass}, this.validateCfPass);
    }
  
    validateCfPass = () => {
      const {cfpassword} = this.state;
      let cfpassValid = true;
      let errorMsg = {...this.state.errorMsg};

      if(this.state.password !== this.state.cfpassword){
        cfpassValid = false;
        errorMsg.cfpassword = "Passwords not equal!";
      }
  
      // cfpass validate regex;
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(cfpassword))
      {
          cfpassValid = false;
          errorMsg.cfpassword = "Password must have Capital Letter, 8 chars minimum, Numbers and Chars!";
      }
  
      this.setState({cfpassValid, errorMsg}, this.validateForm);
    }

  // email validation;
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

  onSubmitHandler = () => {
    // Make a request for a user with a argument
    const this_ = this;
    axios.post('http://usrlogin.local/api/users/signup', this.state)
      .then(function (response) {
        // handle success
        if(!response.data && response.data.error){
          this_.setState({errorMsg:response.data.message})
          console.log('Error: ' + this_.errorMsg);
        }
        else{
          console.log('Success: '+response);
        }
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
        <Header header="Signup" />
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
            <div className="form-group">
              <label htmlFor="cfpassword">Confirm Password</label>
              <ValidationMessage valid={this.state.cfpassValid} message={this.state.errorMsg.cfpassword} />
              <input type="password" id="cfpassword" name="cfpassword" className="form-control"
              value={this.state.cfpassword} onChange={(e) => this.updateCfPass(e.target.value)} />
            </div>
            <div className="form-controls">
              <button className="btn btn-primary" type="button" onClick={this.onSubmitHandler} disabled={!this.state.formValid} >SingUp</button>
            </div>
          </form>
        </div>
        <div className="row">
          <div>{"{"+this.state.email+"}"}</div>
          <div>{"{"+this.state.password+"}"}</div>
          <div>{"{"+this.state.cfpassword+"}"}</div>
        </div>
      </div>
    );
  }
}

export default SignupForm;