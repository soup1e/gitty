const codeForToken = async (code) => {
  console.log(`MOCK exchangeCodeForToken! ${code}`);
  return 'MOCK TOKEN FOR CODE';
};

const getGithubProfile = async (token) => {
  console.log(`MOCK getGithubProfile ${token}`);
  return {
    login: 'fake_github_user',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'not-real@example.com',
  };
};

module.exports = { codeForToken, getGithubProfile };
