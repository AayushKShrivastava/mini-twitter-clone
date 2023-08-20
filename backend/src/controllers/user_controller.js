const constants = require("../constants/constants")
const DatabaseConnectionService = require("../db/services/database_connection_service")
const Follower = require("../models/follower")
const Post = require("../models/post")
const User = require("../models/user")
const Error = require('../utilities/classes/error')


module.exports.follow = async (req, res) => {
  
  const { followee_id } = req.body

  try {
    if(req.err) {
      throw new Error(constants.UNAUTHORIZED.code, constants.UNAUTHORIZED.message)
    }
    DatabaseConnectionService.connect()
    
    const follow_details = {
      follower_id: req.user._id,
      followee_id: followee_id
    }

    const follower = await Follower.create(follow_details)
    var response_data = {
      status: constants.SUCCESS
    }

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

module.exports.unfollow = async (req, res) => {
  
  const { followee_id } = req.body

  try {
    if(req.err) {
      throw new Error(constants.UNAUTHORIZED.code, constants.UNAUTHORIZED.message)
    }
    DatabaseConnectionService.connect()

    const follow_details = {
      follower_id: req.user._id,
      followee_id: followee_id
    }

    await Follower.deleteOne(follow_details)
    var response_data = {
      status: constants.SUCCESS
    }

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

module.exports.followees = async (req, res) => {
  try {
    if(req.err) {
      throw new Error(constants.UNAUTHORIZED.code, constants.UNAUTHORIZED.message)
    }
    DatabaseConnectionService.connect()

    const follower_detail = {
      follower_id: req.user._id
    }

    const follows = await Follower.find(follower_detail)
    if (follows) {
      followee_ids = follows.map(obj => obj.followee_id)
      var users = await User.find({ _id: followee_ids })
    }

    var response_data = {
      status: constants.SUCCESS,
      data: users
    }

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

module.exports.timeline = async (req, res) => {
  try {
    DatabaseConnectionService.connect()

    const follower_detail = {
      follower_id: req.user._id
    }

    const follows = await Follower.find(follower_detail)
    if (follows) {
      followee_ids = follows.map(obj => obj.followee_id)
      var posts = await Post.find({ user_id: followee_ids }).sort({ createdAt: 1})
    }

    var response_data = {
      status: constants.SUCCESS,
      data: posts
    }

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