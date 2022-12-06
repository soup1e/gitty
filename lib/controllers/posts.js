const { Router } = require('express');
const Post = require('../models/Post');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allposts = await Post.getAll();
      res.json(allposts);
    } catch (e) {
      next(e);
    }
  })
  .post('/', [authenticate], async (req, res, next) => {
    try {
      const post = await Post.insert(req.body);
      res.json(post);
    } catch (e) {
      next(e);
    }
  });
