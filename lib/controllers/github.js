const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubUser = require('../models/GithubUser.js');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const { codefortoken, getGithubProfile } = require('../services/github');

module.export = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;

      const token = await codefortoken(code);

      const { email, login, avatar_url } = await getGithubProfile(token);

      let user = await GithubUser.findByLogin(login);

      if (!user) {
        user = GithubUser.insert({
          login,
          email,
          avatar: avatar_url,
        });
      }
      const payload = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/api/v1/github/dashboard');
    } catch (e) {
      next(e);
    }
  });
