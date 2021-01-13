const express = require('express')
const posts = express.Router()

const Post = require('../models/blog.js')

posts.get('/',(req,res) => {
  Post.find({},(err,foundPosts) => {
    res.json(foundPosts)
  })
})
posts.post('/', (req, res) => {
  Post.create(req.body, (err, createdPost) => {
    Post.find({}, (err, foundPosts) => {
      res.json(foundPosts)
    })
  })
})

posts.put('/:id',(req,res) => {
   Post.findByIdAndUpdate(req.params.id,req.body)
})


module.exports = posts
