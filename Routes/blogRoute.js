const mongoose = require('mongoose');
const express=require('express')
const auth = require('../middleware/auth');
const router=express.Router()
const Blog = require('../models/blog')

// API to get specific blog of a user
  router.get('/api/blogs/:id', auth, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  router.get('/api/blogs', auth, async (req, res) => {
const blogs = await Blog.find({ _user: req.user.id })

        res.send(blogs)
  });

  // API to get all blogs of a user
router.post('/api/blogs', auth, async (req, res) => {
      console.log(req)
    const { title, content} = req.body;
    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });

  //API to delete specific blog

router.delete('/post/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ _id: req.params.id, _user: req.user._id })

        if (!blog) {
            res.status(404).send()
        }

        res.send(blog)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router