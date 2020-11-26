import logo200Image from 'assets/img/logo/img1-01.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import validate from './formValidation';
import loaderImg from '../assets/img/loader-example.gif';
import Loader from 'react-loader-advanced';
import { LoginUser, doLoginRes } from '../action/LoginActions';
import { CreateManager, doManagerCreateRes } from '../action/ManagerCreateActions';
import { ListAllCountry, doCountryListRes } from '../action/CountryListActions';
import {ForgotPasswordSuper, doForgotPasswordRes } from '../action/ForgotPasswordActions';
import { ResetPasswordSuper, doResetPasswordRes} from '../action/ResetPasswordActions';

var pattern = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;

class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoader: false,
      isSubmited: false,
      email: '',
      emaillogin:'',
      password: '',
      passwordlogin:'',
      username: '',
      country:'',
      restpassword:'',
      confPassword: '',
      token: '',
      countryData:[],
      isChecked: false,
      checkedTerms: false,
    }
  }
  
  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  get isForgot() {
    return this.props.authState === STATE_FORGOT;
  }

  get isResetPassword(){
    return this.props.authState === STATE_RESET;
  }

  changeAuthState = authState => event => {
    event.preventDefault();
    this.props.onChangeAuthState(authState);
  };

  // onChangeValue = event => {
  //   this.setState({
  //       [event.target.name]: event.target.value
  //   })
  // }

  

  validate(values) {
    const errors = {};
    if(this.isLogin){
      if (values.emaillogin === '') {
        errors.emaillogin = '*Please enter emailid';
      }else if (values.emaillogin !== "undefined") {        
        if (!pattern.test(values.emaillogin)) {
          errors.emaillogin = "Please enter valid email address.";
        }
      }
      if(values.passwordlogin === ''){
        errors.passwordlogin = '*Please enter password';
      }
      return errors;
    }

    if(this.isForgot){
      if (values.email === '') {
        errors.email = '*Please enter emailid';
      }else if (values.email !== "undefined") {          
        
        if (!pattern.test(values.email)) {
          errors.email = "Please enter valid email address.";
        }
      }
      return errors;
    }

    if(this.isResetPassword){
      if (values.restpassword === '') {
        errors.restpassword = '*Please enter password';
      }
      if(values.confPassword === ''){
        errors.confPassword = '*Please enter confirm password';
      } else if(values.restpassword !== values.confPassword){
        errors.confPassword = '*Your new password and confirm password do not match.';
      }
      return errors;
    }
    
    if(this.isSignup){
      // console.log(values.checkedTerms)
      if(values.username && values.username === ''){
        errors.username = '*Please enter name';
      }else if(values.username.trim() === ''){
        errors.username = '*Please enter name';
      }else if(values.username.length === 0){
        errors.username = '*Please enter name';
      }else if(values.username === null){
        errors.username = '*Please enter name';
      }else if(values.username === undefined){
        errors.username = '*Please enter name';
      }

      if(values.country && values.country === ''){
        errors.country = '*Please select country';
      }else if(values.country.trim() === ''){
        errors.country = '*Please select country';
      }else if(values.country.length === 0){
        errors.country = '*Please select country';
      }else if(values.country === null){
        errors.country = '*Please select country';
      }else if(values.country === undefined){
        errors.country = '*Please select country';
      }



      if (values.email === '') {
        errors.email = '*Please enter emailid';
      }else if (values.email !== "undefined") {          
        if (!pattern.test(values.email)) {
          errors.email = "Please enter valid email address.";
        }
      }
      if(values.password === ''){
        errors.password = '*Please enter password';
      }

      if(values.checkedTerms === false){
        errors.checkedTerms = '*Please indicate that you accept the Terms and Conditions'
      }
      
      return errors;
    }
    
  }

  componentDidMount(){
    const data = {};
    this.props.ListAllCountry(data);
    if (localStorage.checkbox && localStorage.emaillogin !== "") {
      this.setState({
          isChecked: true,
          emaillogin: localStorage.username,
          passwordlogin: localStorage.password
      })
    }
    
  }

  onChangeCheckbox = event => {
    this.setState({
        isChecked: event.target.checked
    })
    
  }

  
  handleSubmit = event => {
    event.preventDefault();
    if(this.isLogin){
      this.setState({
        isSubmited: true,        
      }, () => { });
      this.validate(this.state);
      const errors = this.validate(this.state);
      if (Object.keys(errors).length === 0) {  
        const { emaillogin, passwordlogin, isChecked } = this.state
        
        let requestData = {
          email: this.state.emaillogin,
          password: this.state.passwordlogin,
          
        }
        if (isChecked && emaillogin !== "") {
          localStorage.username = emaillogin;
          localStorage.password = passwordlogin;
          localStorage.checkbox = isChecked;
        }else if(this.state.isChecked === false){
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          localStorage.removeItem('checkbox');
        }
        this.setState({
          isLoader: true,          
        }, () => { });
        this.props.loginFormSubmit(requestData);
      }     
    }
    if(this.isSignup){
      this.setState({
        isSubmited: true,        
      }, () => { });
      this.validate(this.state);
      const errors = this.validate(this.state);
      if (Object.keys(errors).length === 0) {  

        let requestData = {
          username: this.state.username,
          email: this.state.email,
          country: this.state.country,
          password: this.state.password,
          checkedTerms: this.state.checkedTerms,
        }
        this.setState({
          isLoader: true,          
        }, () => { });
        // console.log('sig', requestData)
        this.props.CreateManager(requestData);
      }
    }

    if(this.isForgot){
      this.setState({
        isSubmited: true,        
      }, () => { });
      this.validate(this.state);
      const errors = this.validate(this.state);
      if (Object.keys(errors).length === 0) {  

        let requestData = {
          
          email: this.state.email,
        }
        this.setState({
          isLoader: true,          
        }, () => { });
        this.props.ForgotPasswordSuper(requestData);
      }
    }   

    if(this.isResetPassword){
      this.setState({
        isSubmited: true,        
      }, () => { });
      this.validate(this.state);
      const errors = this.validate(this.state);
      if (Object.keys(errors).length === 0) {  

        let requestData = {          
          newpass: this.state.restpassword,
          mailtoken: this.state.token
        }
        this.setState({
          isLoader: true,          
        }, () => { });
        // console.log('rest', requestData)
        this.props.ResetPasswordSuper(requestData);
      }
    }
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'SIGN IN';
    }

    if (!buttonText && this.isSignup) {
      return 'SIGN UP';
    }

    if (!buttonText && this.isForgot) {
      return 'FORGOT PASSWORD';
    }
    if (!buttonText && this.isResetPassword) {
      return 'RESET PASSWORD';
    }

    return buttonText;
  }

  componentWillReceiveProps(nextProps){
    console.log('login', nextProps)

    if(nextProps.token){
      this.setState({
        token: nextProps.token
      })
    }

    if(nextProps.doLoginRes && nextProps.doLoginRes.user){
      if(nextProps.doLoginRes.user &&  nextProps.doLoginRes.user.LoginUser){
        if(nextProps.doLoginRes.user.LoginUser && nextProps.doLoginRes.user.LoginUser.success === true){
          localStorage.setItem('auth_token', nextProps.doLoginRes.user.LoginUser.token);
          localStorage.setItem('managerId', nextProps.doLoginRes.user.LoginUser.data._id);
          localStorage.setItem('managerName', nextProps.doLoginRes.user.LoginUser.data.username);
          localStorage.setItem('managerAdminData', JSON.stringify(nextProps.doLoginRes.user.LoginUser.data))
          this.setState({
            isLoader: false,
          });
          window.location.href ='/dashboard';
        }else{
          this.setState({
            isLoader: false,
          });
        }        
      }
    }
    
    if(nextProps.doManagerCreateRes && nextProps.doManagerCreateRes.user){
      if(nextProps.doManagerCreateRes.user && nextProps.doManagerCreateRes.user.ManagerCreateRes){
        if(nextProps.doManagerCreateRes.user.ManagerCreateRes && nextProps.doManagerCreateRes.user.ManagerCreateRes.success === true){
          this.setState({
            isLoader: false,
          });
          window.location.href ='/';
        }else{
          this.setState({
            isLoader: false,
          });
        }
      }
    }

    if(nextProps.doCountryListRes && nextProps.doCountryListRes.user){
      if(nextProps.doCountryListRes.user && nextProps.doCountryListRes.user.AllCountryListRes){
        if(nextProps.doCountryListRes.user.AllCountryListRes && nextProps.doCountryListRes.user.AllCountryListRes.success === true){
          this.setState({
            countryData : nextProps.doCountryListRes.user.AllCountryListRes.CountryList
          })
        }
      }
    }

    if(nextProps.doForgotPasswordRes && nextProps.doForgotPasswordRes.user){
      if(nextProps.doForgotPasswordRes.user && nextProps.doForgotPasswordRes.user.ForgotPasswordRes){
        if(nextProps.doForgotPasswordRes.user.ForgotPasswordRes && nextProps.doForgotPasswordRes.user.ForgotPasswordRes.success === true){
          this.setState({
            isLoader: false,
          });
          window.location.href ='/';
        } else{
          this.setState({
            isLoader: false,
          });
        }
      }
    }

    if(nextProps.doResetPasswordRes && nextProps.doResetPasswordRes.user){
      if(nextProps.doResetPasswordRes.user && nextProps.doResetPasswordRes.user.ResetPasswordRes){
        if(nextProps.doResetPasswordRes.user.ResetPasswordRes && nextProps.doResetPasswordRes.user.ResetPasswordRes.success === true){
          this.setState({
            isLoader: false,
          });
          window.location.href ='/';
        } else{
          this.setState({
            isLoader: false,
          });
        }
      }
    }

  }

  termChangs = () =>{
    this.setState({
      checkedTerms : !this.state.checkedTerms
    })
  }

  render() {
    const {  isChecked } = this.state
    const errors = this.validate(this.state);
    const { isSubmited} = this.state;
    const {
      showLogo,
      usernameLabel,
      userCountryLabel,
      usernameInputProps,
      // userCountryInputProps,
      useremailLabel,
      useremailInputProps,
      useremailloginLabel,
      useremailloginInputProps,
      passwordLabel,
      passwordResetLabel,
      passwordloginLabel,
      passwordInputProps,
      passwordloginInputProps,
      passwordResetInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;

    const spinner = <span><img src={loaderImg} alt="" /></span>;

    return (
      <div>
        <Loader show={this.state.isLoader} message={spinner}>
          <Form onSubmit={this.handleSubmit}>
            {showLogo && (
              <div className="text-center pb-4">
                <img
                  src={logo200Image}
                  className="rounded"
                  style={{ width: '50%',  cursor: 'pointer' }}
                  alt="logo"
                  onClick={onLogoClick}
                />
              </div>
            )}
            {this.isSignup && (
              <FormGroup>
                <Label for={usernameLabel}>{usernameLabel}</Label>
                <Input {...usernameInputProps} onChange={(e) => this.setState({username:e.target.value})} value={this.state.username} />
                {errors && isSubmited && <span className="error-message">{errors.username}</span>}
              </FormGroup>
            )}
            
            {this.isSignup && (<FormGroup>
              <Label for={useremailLabel}>{useremailLabel}</Label>
              <Input {...useremailInputProps} onChange={(e) => this.setState({email:e.target.value})} value={this.state.email}/>
              {errors && isSubmited && <span className="error-message">{errors.email}</span>}
            </FormGroup>)}

            {this.isLogin && (<FormGroup>
              <Label for={useremailloginLabel}>{useremailloginLabel}</Label>
              <Input {...useremailloginInputProps} onChange={(e) => this.setState({emaillogin:e.target.value})} value={this.state.emaillogin}/>
              {errors && isSubmited && <span className="error-message">{errors.emaillogin}</span>}
            </FormGroup>)}

            {this.isForgot && (<FormGroup>
              <Label for={useremailLabel}>{useremailLabel}</Label>
              <Input {...useremailInputProps} onChange={(e) => this.setState({email:e.target.value})} value={this.state.email}/>
              {errors && isSubmited && <span className="error-message">{errors.email}</span>}
            </FormGroup>)}
            
            {this.isSignup && (
              <FormGroup>
                <Label for={userCountryLabel}>{userCountryLabel}</Label>
                {/* <Input {...userCountryInputProps}  /> */}
                <select className="form-control" name="country" onChange={(e) => this.setState({country:e.target.value})}>
                  <option value="">Select Country</option>
                  {this.state.countryData.map((item, i) =>(
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>             
                {errors && isSubmited && <span className="error-message">{errors.country}</span>}
              </FormGroup>
            )}
            {this.isLogin && (<FormGroup>
              <Label for={passwordloginLabel}>{passwordLabel}</Label>
              <Input {...passwordloginInputProps}  onChange={(e) => this.setState({passwordlogin:e.target.value})} value={this.state.passwordlogin}/>
              {errors && isSubmited && <span className="error-message">{errors.passwordlogin}</span>}
            </FormGroup>)}

            {this.isSignup && (<FormGroup>
              <Label for={passwordLabel}>{passwordLabel}</Label>
              <Input {...passwordInputProps}  onChange={(e) => this.setState({password:e.target.value})} value={this.state.password}/>
              {errors && isSubmited && <span className="error-message">{errors.password}</span>}
            </FormGroup>)}
            

            {this.isResetPassword && (<FormGroup>
              <Label for={passwordResetLabel}>{passwordResetLabel}</Label>
              <Input {...passwordResetInputProps} onChange={(e) => this.setState({restpassword:e.target.value})} value={this.state.restpassword}/>
              {errors && isSubmited && <span className="error-message">{errors.restpassword}</span>}
            </FormGroup>)}

            {this.isResetPassword && (
              <FormGroup>
                <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
                <Input {...confirmPasswordInputProps} onChange={(e) => this.setState({confPassword:e.target.value})} value={this.state.confPassword} />
                {errors && isSubmited && <span className="error-message">{errors.confPassword}</span>}
              </FormGroup>
            )}

            <FormGroup check>
              {this.isSignup && <Label check>
                <Input type="checkbox" name="checkedTerms" checked={this.state.checkedTerms} onChange={this.termChangs} value={this.state.checkedTerms}  />{' '}
                  <span className="dofont">I agree all <a className="clratag" href="/">Terms and conditions</a></span>
                <br/>
                {errors && isSubmited && <span className="error-message">{errors.checkedTerms}</span>}
              </Label>              
              } 
              {this.isLogin && <Label check>
                <Input type="checkbox" onChange={this.onChangeCheckbox} checked={isChecked}/>{' '}
                Remember me
              </Label>}
              {this.isLogin ? (
              <span className="flot_forgot"><a href="#forgotPassword" onClick={this.changeAuthState(STATE_FORGOT)}>Forgot Password?</a></span>) : ('')}
            </FormGroup>
            <hr />
            <Button
              size="lg"
              className="bg-gradient-theme-left border-0"
              block
              onClick={this.handleSubmit}>
              {this.renderButtonText()}
            </Button>

            <div className="text-center pt-3">
              {/* {this.isForgot && (<h6>or</h6>)}
              {this.isLogin && (<h6>or</h6>)}
              {this.isSignup && (<h6>or</h6>)} */}
              <h6>
                {this.isSignup && (
                  <><span className="dofont">Have an account? </span><a href="/" className="clratag" onClick={this.changeAuthState(STATE_LOGIN)}>
                    SIGN IN
                  </a></>
                ) }
                
                {this.isLogin && (
                  <><span className="dofont">Don't have an account? </span><a className="clratag" href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                      SIGN UP
                  </a></>
                )}

                {this.isForgot && (
                  <><span className="dofont">Have an account? </span><a href="/" className="clratag" onClick={this.changeAuthState(STATE_LOGIN)}>
                  SIGN IN
                  </a></>
                )}
               
                
              </h6>
            </div>
            {children}
          </Form>
        </Loader>
      </div>      
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';
export const STATE_FORGOT = 'FORGOTPASSWORD';
export const STATE_RESET = 'RESETPASSWORD';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP, STATE_FORGOT]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  userCountryLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  userCountryInputProps: PropTypes.object,
  useremailLabel: PropTypes.string,
  useremailInputProps: PropTypes.object,
  useremailloginLabel: PropTypes.string,
  useremailloginInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  passwordloginLabel: PropTypes.string,
  passwordloginInputProps: PropTypes.object,
  passwordResetLabel: PropTypes.string,
  passwordResetInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,

  doLoginRes: PropTypes.any,
  doManagerCreateRes: PropTypes.any,
  doCountryListRes: PropTypes.any,
  doForgotPasswordRes: PropTypes.any,
  doResetPasswordRes: PropTypes.any,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  useremailLabel: 'Email',
  useremailInputProps: {
    type: 'email',
    name: 'email',
    placeholder: 'Enter your emailid',
    autoComplete:"off"
  },
  useremailloginLabel: 'Email',
  useremailloginInputProps: {
    type: 'email',
    name: 'emaillogin',
    placeholder: 'Enter your emailid',
    autoComplete:"off"
  },
  usernameLabel: 'Name',
  usernameInputProps: {
    type: 'text',
    name:'username',
    placeholder: 'Enter your name',
    autoComplete:"off"
  },
  userCountryLabel: 'Select Country',
  userCountryInputProps: {
    type: 'select',
    name:'country',
    autoComplete:"off"
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    name: 'password',
    placeholder: 'Enter your password',
    autoComplete:"off"
  },
  passwordloginLabel: 'Password',
  passwordloginInputProps: {
    type: 'password',
    name: 'passwordlogin',
    placeholder: 'Enter your password',
    autoComplete:"off"
  },
  passwordResetLabel: 'New Password',
  passwordResetInputProps: {
    type: 'password',
    name: 'restpassword',
    placeholder: 'Enter new password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    name: 'confPassword',
    placeholder: 'Enter confirm password',
    autoComplete:"off"
  },
  onLogoClick: () => {},
};

const mapStateToProps = createStructuredSelector({
  doLoginRes: doLoginRes,
  doManagerCreateRes: doManagerCreateRes,
  doCountryListRes: doCountryListRes,
  doForgotPasswordRes: doForgotPasswordRes,
  doResetPasswordRes: doResetPasswordRes,
});

function mapDispatchToProps(dispatch) {
  return {
    loginFormSubmit: (data) => dispatch(LoginUser(data)),
    CreateManager: (data) => dispatch(CreateManager(data)),
    ListAllCountry: (data) => dispatch(ListAllCountry(data)),
    ForgotPasswordSuper: (data) => dispatch(ForgotPasswordSuper(data)),
    ResetPasswordSuper: (data) => dispatch(ResetPasswordSuper(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AuthForm);
