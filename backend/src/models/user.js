const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const Error = require('../utilities/classes/error')

const user_schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
})

// Hash user password before saving
user_schema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// login user
user_schema.statics.login = async function (username, password) {
  const user = await this.findOne({ username })
  if(user) {
    const auth = await bcrypt.compare(password, user.password)
    if(auth) {
      return user
    }
    throw new Error(constants.INVALID_PASSWORD.Code, constants.INVALID_PASSWORD.Message)
  }
  throw new Error(constants.INVALID_USERNAME.Code, constants.INVALID_USERNAME.Message)
}

const User = mongoose.model('user', user_schema)

module.exports = User
