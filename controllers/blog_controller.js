const express = require('express')
const posts = express.Router()
const postSeed = require('../models/post_seed.js')

const Post = require('../models/blog.js')

posts.get('/',(req,res) => {
  Post.find({},(err,foundPosts) => {
    res.json(foundPosts)
  })
})

/////////////////POST///////////////////////////////////////////////////////////

posts.post('/', (req, res) => {
  Post.create(req.body, (err, createdPost) => {
    Post.find({}, (err, foundPosts) => {
      res.json(foundPosts)
    })
  })
})

/////////////////PUT////////////////////////////////////////////////////////////

posts.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id,req.body,{new: true},
    (err, updatedPost) => {
      if (err) {
        res.send(err)
      } else {
        Post.find({}, (err, foundPosts) => {
          res.json(foundPosts)
        })
      }
    }
  )
})
/////////////////DELETE//////////////////////////////////////////////////////////
posts.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    Post.find({}, (err, foundPosts) => {
      res.json(foundPosts)
    })
  })
})




module.exports = posts
