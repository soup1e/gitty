const fetch = require('cross-fetch');

const codefortoken = async (code) => {
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'applications/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GH_CLIENT_ID,
      client_secret: process.env.GH_CLIENT_SECRET,
      code,
    }),
  });

  const data = await res.json();
  console.log(data);
  return data.access_token;
};

const getGithubProfile = async (token) => {
  const res = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  const data = await res.json();
  return data;
};

module.exports = { codefortoken, getGithubProfile };
