const { Router } = require('express');
const Post = require('../models/Post');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const allposts = await Post.getAll();
    res.json(allposts);
  } catch (e) {
    next(e);
  }
});
