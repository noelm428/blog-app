const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    name: {type: String, required: true},
    image: String,
    post: {type: String, required: true},
    date: Date,


})

const Post = mongoose.model('Post',postSchema)

module.exports = Post
