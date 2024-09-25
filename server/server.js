const express = require('express');
const mongoose = require('mongoose');
//Access hidden environment files, protects passwords and other private info
require('dotenv').config();

const userController = require('./controllers/userController');

const PORT = 3000;
const app = express();
//Accesses URI through .env file. We will make our own URI
const MONGO_URI = process.env.MONGO_URI;
//Connect to the DB, show success or catch error
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`Connected to MongoDB at ${MONGO_URI}`))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.json());

//POST request to log-in, send success message if successful
app.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'successfully login',
  });
});

//POST request to create a user, send success message if successful
app.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'successfully signed up',
  });
});

// used to try to get around broswer's cross origin issues on frontend
// only seems to work with :param syntax?
//Depending on the issue, perhaps we can solve another way?
app.get('/corsproxy/:url', async (req, res, next) => {
  try {
    const fetch_url = `${req.query.url}?key=${
      req.query.key
    }&origin=${req.query.origin.replace(
      ' ',
      '+'
    )}&destination=${req.query.destination.replace(' ', '+')}${
      req.query.waypoints ? '&waypoints=' + req.query.waypoints : ''
    }`;

    const response = await fetch(fetch_url);
    const data = await response.json();
    return res
      .status(200)
      .setHeader('Access-Control-Allow-Origin', '*') // all this is to set this header on the response to the browser
      .json(data);
  } catch (error) {
    return next({
      success: false,
      log: 'CORS-Proxy: ' + error,
      status: 500,
      message: 'An Proxy error occurred',
    });
  }
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    success: false,
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: 'An error occurred',
  };
  const errorObj = Object.assign({}, defaultErr, err);

  console.log(errorObj.log);
  return res.status(errorObj.status).json({
    success: errorObj.success,
    message: errorObj.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
