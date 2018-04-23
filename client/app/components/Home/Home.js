import React, { Component } from 'react';
import 'whatwg-fetch';

import {getFromStorage, setInStorage} from '../../utils/storage'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      isLoading: true,

      signUpError: '',
      signInError: '',

      signInEmail: '',
      signInPassword: '',

      signUpPassword: '',
      signUpEmail: '',
      signUpFirstName: '',
      signUpLastName: ''

    };

    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this)
    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this)
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this)
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this)
    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this)
    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this)

  }

  componentDidMount() {

    const token = getFromStorage('TROLL')

    if(token){
      fetch('/api/account/verify?token' + token)
      .then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            token:token,
            isLoading: false
          })
        } else {
          this.setState({
            isLoading: false,
          })
        }
      })

    } else {
      this.setState({
        //this part is for the sighn in and sign up page
        isLoading: false,
      })
    }
  }

  onTextBoxChangeSignInEmail(event){
    this.setState({
      signInEmail: event.target.value
    })
  }

  onTextBoxChangeSignInPassword(event){
    this.setState({
      signInPassword: event.target.value
    })
  }

  onTextBoxChangeSignUpEmail(event){
    this.setState({
      signUpEmail: event.target.value
    })
  }

  onTextBoxChangeSignUpPassword(event){
    this.setState({
      signUpPassword: event.target.value
    })
  }

  onTextBoxChangeSignUpFirstName(event){
    this.setState({
      signUpFirstName: event.target.value
    })
  }

  onTextBoxChangeSignUpLastName(event){
    this.setState({
      signUpLastName: event.target.value
    })
  }




  render() {

    const {
      isLoading,
      token,
      //if token is available
      signInEmail,
      signInPassword,
      //if there is an error for sigining up and in
      signInError,
      signUpError,
      //Signing up a new account
      signUpEmail,
      signUpPassword,
      signUpFirstName,
      signUpLastName,

    } = this.state;


    if(isLoading){ //if its loading and there is no token
      return (
        <div>
        <p>Loading...
        </p>
        </div>
      )
    }

    if(!token){ //if token is not available its a sign up and sign in process

      return (
        <div>
        <div>
        {
          (signInError) ? ( //if sign in error true
            <p>{signInError}</p> // return the sign in error
          ) : (null) // otherwise return null
        }
        <p>Sign In</p>

        <input
        type ='email'
        placeholder='Email'
        value={signInEmail}
        onChange = {this.onTextBoxChangeSignInEmail}

        /><br/>

        <input
        type ='password'
        placeholder='Password'
        value={signInPassword}
        onChange = {this.onTextBoxChangeSignInPassword}

        /><br/>
        <button>Sign In</button>
        </div>
        <br/>
        <br/>
        <div>

        <p>Sign Up</p>

        <input
        type ='email'
        placeholder='Email'
        value={signUpEmail}
        onChange = {this.onTextBoxChangeSignUpEmail}

        /><br/>

        <input
        type ='text'
        placeholder='First Name'
        value={signUpFirstName}
        onChange = {this.onTextBoxChangeSignUpFirstName}

        /><br/>

        <input
        type ='text'
        placeholder='Last Name'
        value={signUpLastName}
        onChange = {this.onTextBoxChangeSignUpLastName}

        /><br/>

        <input
        type ='password'
        placeholder='Password'
        value={signUpPassword}
        onChange = {this.onTextBoxChangeSignUpPassword}

        /><br/>
        <button>Sign Up</button>
        </div>
        </div>
      )
    }


    return ( //if there is a token available and is set and is verified
      <div>
      <div>
      <p>Account</p>
      </div>
      </div>
    );
  }
}

export default Home;
