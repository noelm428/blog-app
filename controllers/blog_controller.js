const express = require('express')
const posts = express.Router()

const Post = require('../models/blog.js')

posts.get('/',(req,res) => {
  Post.find({},(err,foundPosts) => {
    res.json(foundPosts)
  })
})



module.exports = posts
