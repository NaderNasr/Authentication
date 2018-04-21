const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: Number,
    default: -1  //-1 if there are no users since '0' is counted as the first user
  },

  date: {
    type: Data,
    default: Data.now()
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);
