const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/user')
const DatabaseConnectionService = require('../db/services/database_connection_service')
const constants = require('../constants/constants')

dotenv.config()

const require_auth = (req, res, next) => {
  const token = req.cookies['user-token']

  if(token) {
    jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decoded_token) => {
      if(err) {
          req.err = err
          next()
      }
      else {
        DatabaseConnectionService.connect()
        req.user = await User.findById(decoded_token.id)
        next()
      }
    })
  }
  else {
    req.err = constants.UNAUTHORIZED
    next()
  }
  
}

module.exports = { require_auth }
