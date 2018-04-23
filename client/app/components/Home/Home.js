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
      signInError: ''
    };


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



  render() {

    const {
      isLoading,
      token,
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
        <p>Sign In</p>
        <input type ='email' placeholder='Email'/>
        <input type ='password' placeholder='Password'/>
        </div>
        <br/>
        <br/>
        <div>
        <p>Sign Up</p>
        <input type ='email' placeholder='Email'/>
        <input type ='text' placeholder='First Name'/>
        <input type ='text' placeholder='Last Name'/>
        <input type ='password' placeholder='Password'/>

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
