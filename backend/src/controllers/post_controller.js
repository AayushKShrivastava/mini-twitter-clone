const constants = require("../constants/constants")
const DatabaseConnectionService = require("../db/services/database_connection_service")
const Post = require("../models/post")

module.exports.create_post = async (req, res) => {
  const { content } = req.body
  try {
    DatabaseConnectionService.connect()

    const post_details = {
      user_id: req.user._id,
      content: content
    }

    var post = await Post.create(post_details)

    var response_data = {
      status: constants.SUCCESS,
      data: [post]
    }
  
    res.status(201).json(response_data)
  }
  catch {
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

module.exports.update_post = async (req, res) => {
  const { content } = req.body
  const post_id = req.params.post_id
  try {
    DatabaseConnectionService.connect()

    const post_details = {
      content: content
    }
    
    var post = await Post.updateOne({_id: post_id, user_id: req.user._id }, post_details)
    
    var response_data = {
      status: constants.SUCCESS
    }
  
    res.status(200).json(response_data)
  }
  catch {
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

module.exports.delete_post = async (req, res) => {
  const post_id = req.params.post_id

  try {
    DatabaseConnectionService.connect()

    const post_details = {
      _id: post_id, 
      user_id: req.user._id
    }
    
    await Post.deleteOne(post_details)
    
    var response_data = {
      status: constants.SUCCESS
    }
  
    res.status(200).json(response_data)
  }
  catch {
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

module.exports.user_posts = async (req, res) => {
  try {
    DatabaseConnectionService.connect()

    const post_details = {
      user_id: req.user._id
    }
    
    var posts = await Post.find(post_details)
    
    var response_data = {
      status: constants.SUCCESS,
      posts: posts
    }
  
    res.status(200).json(response_data)
  }
  catch {
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
