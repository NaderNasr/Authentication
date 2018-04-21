const User = require(../../models/User)



module.exports = (app) => {
//Difference between var , let , const (ES5 VS ES6)
//why should we use const and let!!
//so that there is no repetition in variable names
//https://www.youtube.com/watch?v=sjyJBL5fkp8


  app.post('api/account/signup', (request, response, next) => {

      const { body } = request
      const  {firstName, lastName, email, password } = body;

      if(!firstName){
        response.end({
          success: false;
          message: 'First Name Cannot Be Empty'
        })
      }


      if(!lastName){
        response.end({
          success: false;
          message: 'Last Name Cannot Be Empty'
        })
      }

      if(!email){
        response.end({
          success: false;
          message: 'E-mail Cannot Be Empty'
        })
      }

      if(!password){
        response.end({
          success: false;
          message: 'password Cannot Be Empty'
        })
      }

      email = email.toLowerCase() //setting all email data to lower case

      //Verify email address
      User.find({

        email: email,

      }, (err, storedData) => {

        if( err ){

            response.end('No User found')

        } else if (storedData > 0){

      response.end('Email Already Used')

        }

        //Save new user to data database if the email is not in use or existing in the database

        const newUser = new User();
        //Creating a new table for the new user and save it to the data base




      })

  })
}
