import React from 'react';
import '../App.css';
import Header from './Header';
import Input from './Input';
import SideBar from '../Views/Sidebar';
import axios from '../hoc/axios-baseurl';
import { sideList} from '../Helpers/RoutersConfig';
import Navigation from '../Views/Navigation';
import { connect } from 'react-redux';
import * as actionType from '../store/actions';
import Alert from '../Helpers/Alert';

class SignupForm extends React.Component {
  
  state = {
    email: '', emailValid: false,
    password: '', passValid: false,
    cfpassword: '', cfpassValid: false,
    formValid: false,
    errorMsg: {},
    error: '',
    posted: true
  }

  validateForm = () => {
    const { passValid, cfpassValid, emailValid } = this.state;
    this.setState({ formValid: passValid && cfpassValid && emailValid });
  }

  //Password validation;
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
      errorMsg.password = "Password should start with Capital Letter, should be 8 chars minimum, Must Contain Numbers, Chars!";
    }

    this.setState({ passValid, errorMsg }, this.validateForm);
  }

  //Confirm Password validation;
  updateCfPass = (cfpass) => {
    this.setState({ cfpassword: cfpass }, this.validateCfPass);
  }

  validateCfPass = () => {
    const { cfpassword } = this.state;
    let cfpassValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // cfpass validate regex;
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(cfpassword)) {
      cfpassValid = false;
      errorMsg.cfpassword = "Password must have Capital Letter, 8 chars minimum, Numbers and Chars!";
    }

    if (this.state.password !== cfpassword) {
      cfpassValid = false;
      errorMsg.cfpassword = "Passwords not equal!";
    }

    this.setState({ cfpassValid, errorMsg }, this.validateForm);
  }

  // email validation;
  updateEmail = (email) => {
    this.setState({ email }, this.validateEmail)
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

  onSubmitHandler = () => {
    const self = this;
    console.log("state: ", this.state);
    axios.post('/users/signup', this.state)
      .then(function (response) {
          self.setState({ posted: true });
          self.props.onGetError(response.data.message);
          self.props.history.push('/users');
          console.log('success: ', response.data.message);
      })
      .catch(function (error) {
          self.setState({ posted: false });
          self.props.onGetError(error.message);
          console.log('Post Error: ' + error.message);
      })
      .finally(function () {});
  }

  render() {
    return (


      <div className="container">
        <Navigation />
        <div className="row justify-content-center" style={{marginTop: '60px'}}>
          <div className="col-sm-4">
            <SideBar sideList={sideList} />
          </div>
          <div className="col-sm-8">
            <Header header="Signup" />
            {!this.state.posted ? <Alert mode="danger" msg={this.props.signupResponseMessage} /> : null}
            <form action="#" id="js-form">
              <Input
                htmlFor="emial"
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
              <Input
                htmlFor="cfpassword"
                label="Confirm Password"
                valid={this.state.cfpassValid}
                message={this.state.errorMsg.cfpassword}
                elementType="input"
                type="password" id="cfpassword" name="cfpassword"
                value={this.state.cfpassword}
                changed={(e) => this.updateCfPass(e.target.value)}
              />
              <div className="form-controls">
                <button className="btn btn-primary" type="button" onClick={this.onSubmitHandler} disabled={!this.state.formValid} >SingUp</button>
              </div>
            </form>
          </div>
          <div className="row justify-content-center">
            <div>{"{" + this.state.email + "}"}</div>
            <div>{"{" + this.state.password + "}"}</div>
            <div>{"{" + this.state.cfpassword + "}"}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  console.log('User Redux State');
  return{
      signupResponseMessage: state.responseMessage
  }
}

const mapDispatchToProps = dispatch =>{
  return{
      onGetError: (error) => dispatch({type: actionType.POST_RESPONSE_MESSAGE, error: error})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);