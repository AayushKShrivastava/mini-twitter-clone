const constants = require("../constants/constants")
const jwt = require('jsonwebtoken')
const DatabaseConnectionService = require('../db/services/database_connection_service')
const User = require("../models/user")
const dotenv = require('dotenv')

const expiry = 3 * 24 * 60 * 60

const create_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SIGNATURE, {
    expiresIn: expiry
  })
}

module.exports.signup = async (req, res) => {
  const { username, password } = req.body

  try {
    DatabaseConnectionService.connect()

    var user_details = {
      username: username,
      password: password
    }

    var user = await User.create(user_details)

    var response_data = {
      status: constants.SUCCESS,
      data: [user]
    }

    const token = create_token(user._id)
    res.cookie('user-token', token, { httpOnly: true, maxAge: expiry * 1000, sameSite: 'none' })
    res.status(201).json(response_data)
  }
  catch(err) {
    var response_data = {
      status : constants.FAILURE,
      error : {
          code : err.code,
          message : err.message
      }
    }

    res.status(400).json(response_data)
  }

}

module.exports.login = async (req, res) => {
  const { username, password } = req.body

  try {
    DatabaseConnectionService.connect()

    var user = await User.login(username, password)

    var response_data = {
      status: constants.SUCCESS,
      data: [user]
    }

    const token = create_token(user._id)
    res.cookie('user-token', token, { httpOnly: true, maxAge: expiry * 1000, sameSite: 'none' })
    res.status(200).json(response_data)
  }
  catch(err) {
    var response_data = {
      status : constants.FAILURE,
      error : {
          code : err.code,
          message : err.message
      }
    }

    res.status(400).json(response_data)
  }
}

module.exports.logout = (req, res) => {
  var response_data = {
    status: constants.SUCCESS
  }
  res.cookie('user-token', '', { maxAge: 1 })
  res.status(200).send(response_data)
}
