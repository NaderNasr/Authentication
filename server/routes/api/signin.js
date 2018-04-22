const User = require('../../models/User')
const UserSession = require('../../models/UserSession')

//User model

module.exports = (app) => {
  //Difference between var , let , const (ES5 VS ES6)
  //why should we use const and let!!
  //so that there is no repetition in variable names
  //https://www.youtube.com/watch?v=sjyJBL5fkp8

  //--------------USER SIGN UP-------------------------------------
  app.post('api/account/signup', (request, response, next) => {

    const { body } = request
    const { firstName, lastName, password } = body;
    const { email } = body;

    if(!firstName){
      return response.send({
        success: false,
        message: 'First Name Cannot Be Empty'
      })
    }


    if(!lastName){
      return response.send({
        success: false,
        message: 'Last Name Cannot Be Empty'
      })
    }

    if(!email){
      return response.send({
        success: false,
        message: 'E-mail Cannot Be Empty'
      })
    }

    if(!password){
      return response.send({
        success: false,
        message: 'password Cannot Be Empty'
      })
    }


    console.log('THIS IS WORKING !!')

    email = email.toLowerCase() //setting all email data to lower case

    //Verify email address
    User.find({

      email: email,

    },

    (err, storedData) => {

      if( err ){

        return response.send({
          success: false,
          message: 'Email Cannot Be Empty'
        })
      } else if (storedData > 0){

        return response.send({
          success: false,
          message: 'Email is Taken'
        })
      }

      //Save new user to data database if the email is not in use or existing in the database

      const newUser = new User();
      //Creating a new table for the new user and save it to the data base
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err,user) => {
        if(err){
          response.end({
            success: false,
            message: 'Please Check There seems to be an Error'
          })
        } else {
          response.end({
            success: true,
            message: 'Success Signed up'
          })
        }


      })




    })

  })

  app.post('api/account/signin', (request, response, next) => {

    const { body } = request
    const { firstName, lastName, password } = body;
    const { email } = body;


    if(!firstName){
      return response.send({
        success: false,
        message: 'First Name Cannot Be Empty'
      })
    }


    if(!lastName){
      return response.send({
        success: false,
        message: 'Last Name Cannot Be Empty'
      })
    }

    if(!email){
      return response.send({
        success: false,
        message: 'E-mail Cannot Be Empty'
      })
    }

    if(!password){
      return response.send({
        success: false,
        message: 'password Cannot Be Empty'
      })
    }

    User.find({
      email: email,
    }, (err, users) => {
      if ( err ){
        return response.send({
          success: false,
          message: 'Error...'
        })
      }

      if(users.length != 1){
        return response.send({
          success: false,
          message: 'Error...Not Valid' //invalid password
        })
      }

      const user = users[0]

      if(!user.validPass(password)){
        return response.send({
          success: false,
          message: 'Error...Not Valid' //invalid password
        })
      }

      //Create User SESSIONN
      const UserSession = new UserSession()
      UserSession.userId = user._id
      UserSession.save((err, idd) => {
        if ( err ){
          return response.send({
            success: false,
            message: 'Error...Not Valid'
          })
        }

        return response.send({
          success: true,
          message: 'Sign in has been successful',
          token: idd._id //this is the unique string that the password id and password generates
          //both the password and the ID are connected to the same token
        })


      })



    })

    email = email.toLowerCase()

  })

  app.get('api/account/verify', (request, response, next) => {

    //verify the token in the sign in
    // make sure its unique
    //make sure token is not deleted

      const { query } = request
      const { token } = query

      UserSession.find({
        _id: token,
        isDeleted: false
      },

      (err, sessions) => {

        if( err ){
          return res.send({
            success: false,
            message: 'Server Error'
          })
        }
        if(sessions.length != 1){
          return res.send({
            success: true,
            message: 'Your good to go'
        })

      }


})

}
