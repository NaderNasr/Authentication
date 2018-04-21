const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },

  lastName: {
    type: String,
    default: ''
  },

  email: {
    type: String,
    default: ''
  },

  password: {
    type: String,
    default: ''
  },

  isDeleted: {
    type: Boolean,
    default: false
  }



});

UserSchema.methods.generateHash = function(password){
  return bcrypto.hashSync(password, bcrypt.genSaltSync(8),null)
}

UserSchema.methods.validPass = function (password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
