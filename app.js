// app.js
const express = require('express');
const axios = require('axios');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
// const cors = require('cors');
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// GitHub OAuth routes
app.get('/auth/github', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get('/auth/github/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // You can use the accessToken to fetch user information from GitHub
    // For example, you can call the GitHub API to get user data.
    // For simplicity, let's just store the accessToken in the session.
    req.session.accessToken = accessToken;

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.send('Failed to authenticate with GitHub.');
  }
});

app.get('/profile', (req, res) => {
  if (req.session.accessToken) {
    res.send(`Logged in with GitHub. Access Token: ${req.session.accessToken}`);
  } else {
    res.send('Not logged in.');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
