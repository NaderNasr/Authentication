import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage, setInStorage} from '../../utils/storage'
//import GoogleApiComponent from '../../Home2/Gmaps.js'




// className Home extends React.Component
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
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this)

    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this)
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this)
    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this)
    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this)

    this.onSignUp = this.onSignUp.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
    this.logout = this.logout.bind(this)

  }

  componentDidMount() {

    const obj = getFromStorage('BuyNoMore')
    if(obj && obj.token){
      const {token} = obj.token

      fetch('/api/account/verify?token=' + token)
      .then(response => response.json())
      .then(json => {
        if(json.success){
          this.setState({
            token,
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


  onSignUp(){
    // POST request to backend
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
      signUpFirstName,
      signUpLastName,
    } = this.state

    this.setState({
      isLoading: true,

    })

    fetch('api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
    .then(response => request.json())
    .then(json => {

      console.log(json)

      if(json.success){
        this.setState({
          signUpError: json.message,
          isLoading: false,
          signUpEmail: '',
          signUpPassword: '',
          signUpFirstName: '',
          signUpLastName: '',
        })
      } else {
        this.setState({
          signUpError: json.message,
          isLoading: false,

        })
      }
    })


  }

  onSignIn() {
    // POST request to backend
    // Grab state
    const {
      signInEmail,
      signInPassword,

    } = this.state

    this.setState({
      isLoading: true,

    })

    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        email: signInEmail,
        password: signInPassword,
      }),
    })
    .then(response => request.json())
    .then(json => {
      console.log(json)
      if(json.success){
        setInStorage('BuyNoMore', {token: json.token}) //save the token
        this.setState({
          signInError: json.message,
          isLoading: false,
          signInEmail: '',
          signInPassword: '',
          token: json.token,

        })
      } else {
        this.setState({
          signInError: json.message,
          isLoading: false,

        })
      }
    })
  }

  logout(){
    this.setState({
      isLoading: true
    })
    const obj = getFromStorage('BuyNoMore')
    if(obj && obj.token){
      const {token} = obj;

      fetch('/api/account/logout?token=' + token)
      .then(response => response.json())
      .then(json => {
        if(json.success){
          this.setState({
            token:'',
            isLoading: false,
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


  // googleMaps(){
  //   const apiKey = 'AIzaSyAjLGju0Hfbztam7hq5BqNnOMUmmA4Wgg8';
  // }


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


        <div className = "row">
        <div className="col-3" >
        <div className="card-body">
        {
          (signInError) ? ( //if sign in error true
            <p>{signInError}</p> // return the sign in error
          ) : (null) // otherwise return null
        }
        <p className="breadcrumb">Sign In</p>

        <input
        className="form-control"
        type ='email'
        placeholder='Email'
        value={signInEmail}
        onChange = {this.onTextBoxChangeSignInEmail}

        /><br/>

        <input
        className="form-control"
        type ='password'
        placeholder='Password'
        value={signInPassword}
        onChange = {this.onTextBoxChangeSignInPassword}

        /><br/>
        <button className="btn btn-primary btn-lg active" onClick = {this.onSignIn} >Sign In</button>
        </div>
        <br/>
        <br/>

        {
          (signInError) ? ( //if sign in error true
            <p>{signInError}</p> // return the sign in error
          ) : (null) // otherwise return null
        }



        <div className="card-body" >

        <p className="breadcrumb">Sign Up</p>

        <input
        className="form-control"
        type ='email'
        placeholder='Email'
        value={signUpEmail}
        onChange = {this.onTextBoxChangeSignUpEmail}

        /><br/>

        <input
        className="form-control"
        type ='text'
        placeholder='First Name'
        value={signUpFirstName}
        onChange = {this.onTextBoxChangeSignUpFirstName}

        /><br/>

        <input
        className="form-control"
        type ='text'
        placeholder='Last Name'
        value={signUpLastName}
        onChange = {this.onTextBoxChangeSignUpLastName}

        /><br/>

        <input
        className="form-control"
        type ='password'
        placeholder='Password'
        value={signUpPassword}
        onChange = {this.onTextBoxChangeSignUpPassword}

        /><br/>
        <button className="btn btn-primary btn-lg active" onClick = {this.onSignUp}>Sign Up</button>

        </div>
        </div>
        <div className = "row">



        <div className="card mb-12">
        <img className="card-img-top" src="http://cdn.shopify.com/s/files/1/2512/4020/products/map-syria-jordan-9781553412748-4_1200x1200.jpg?v=1509641801" alt="Card image cap"/>
        <div className="card-body">
        <h5 className="card-title col-md-2 col-md-offset-5">Borrow Items Below</h5>

        <table className="card-text">
        <tbody>
  <tr>
    <th>Item</th>
    <th>Contact</th>
    <th>Location</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td><button>Press</button></td>
    <td>Jabal Amman</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td><button>Press</button></td>
    <td>Jabal Amman</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td><button>Press</button></td>
    <td>Jabal Amman</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td><button>Press</button></td>
    <td>Jabal Amman</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td><button>Press</button></td>
    <td>Jabal Amman</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td><button>Press</button></td>
    <td>Jabal Amman</td>
  </tr>
  </tbody>
</table>


        </div>



        </div>


        </div>
        </div>

      )
    }

    // <div className="col-8">
    // <p>TEST</p>
    // </div>


    return ( //if there is a token available and is set and is verified
      <div>
      <div>
      <p>Account</p>
      </div>
      <button onClick = {this.logout}>LogOut</button>
      // <RaisedButton label='do this thing' />
      </div>
    );
  }
}

export default Home;
