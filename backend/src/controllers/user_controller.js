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
      throw new Error(constants.UNAUTHORIZED.Code, constants.UNAUTHORIZED.Message)
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
      throw new Error(constants.UNAUTHORIZED.Code, constants.UNAUTHORIZED.Message)
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
      throw new Error(constants.UNAUTHORIZED.Code, constants.UNAUTHORIZED.Message)
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

    users = users.map(user => {
      return (
        { ...user._doc, followee: true }
      )
    })

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
    if(req.err) {
      throw new Error(constants.UNAUTHORIZED.Code, constants.UNAUTHORIZED.Message)
    }
    DatabaseConnectionService.connect()

    const follower_detail = {
      follower_id: req.user._id
    }
    
    var posts = []
    const follows = await Follower.find(follower_detail)
    if (follows) {
      var followee_ids = follows.map(obj => obj.followee_id)
      posts = await Post.find({ user_id: followee_ids }).sort({ createdAt: 1})
      var users = await User.find({_id: followee_ids})
    }

    posts = posts.map(post => {
      const user = users.find(user => user._doc._id.valueOf() === post.user_id)
      return {...post._doc, username: user._doc.username}
    })

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

module.exports.users = async (req, res) => {
  const search = req.body.query
  try {
    if(req.err) {
      throw new Error(constants.UNAUTHORIZED.Code, constants.UNAUTHORIZED.Message)
    }
    DatabaseConnectionService.connect()
    
    let people = await User.find({_id: {$not: { $eq: req.user._id }}, username: { $regex: search }})
    const followees = await Follower.find({follower_id: req.user._id})
    const followee_ids = followees.map(obj => obj.followee_id)
    
    people = people.map(user => {
      if(followee_ids.includes(user._doc._id.valueOf())) {
        return ({ ...user._doc, followee: true })
      }
      else {
        return({ ...user._doc, followee: false })
      }
    })
    var response_data = {
      status: constants.SUCCESS,
      data: people
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

module.exports.get_info = async (req, res) => {
  try {
    if(req.err) {
      throw new Error(constants.UNAUTHORIZED.Code, constants.UNAUTHORIZED.Message)
    }
    
    var response_data = {
      status: constants.SUCCESS,
      data: req.user
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