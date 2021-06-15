const mongoose = require('mongoose');
const express=require('express')
const auth = require('../middleware/auth');
const router=express.Router()
const Blog = require('../models/blog')

// API to get specific blog of a user
//Request JSON => pass id og blog i.e. "60c79604dc38350488af579f" for existing blog in mongoDB
  router.get('/api/blogs/:id', auth, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  // API to get all blogs
  router.get('/api/blogs', auth, async (req, res) => {
      console.log("user if "+req.user.id)
const blogs = await Blog.find({ _user: req.user.id })
        res.send(blogs)
  });

  // API to post  blogs of a user
//Request JSON=> {"title":"My blog","content":"this is mmy first blog"}
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
//Request JSON => pass id og blog i.e. "60c79604dc38350488af579f" for existing blog in mongoDB
//test delete API using above ID, paasing in query parameters
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