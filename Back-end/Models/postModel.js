const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  songTitle: String,
  username: String,
  artist: String,
  releaseYear: Number,
  imageVideo: String,
  genre: String,
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;


