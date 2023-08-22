const mongoose = require("mongoose")

const follower_schema = new mongoose.Schema({
  follower_id: {
    type: String,
    required: true
  },
  followee_id: {
    type: String,
    required: true
  }
})

follower_schema.index({ follower_id: 1, followee_id: 1 }, { unique: true });
const Follower = mongoose.model('follower', follower_schema)

module.exports = Follower
