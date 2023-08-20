const mongoose = require("mongoose")

const post_schema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

const Post = mongoose.model('post', post_schema)

module.exports = Post