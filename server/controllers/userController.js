const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const userController = {};

//server/models/userModel.js
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    User.findOne({ username })
      .then((thisUser) => {
        //If there is no user with this username, create a user
        if (thisUser === null) {
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) =>
              User.create({ username, password: hashedPassword })
            )
            .then((user) => {
              res.locals.user = user;
              return next();
            })
            //error handling for bcrypt
            .catch((err) => {
              return next({
                log: 'error in creating user or hashing password' + err.message,
                message: 'Failed to create user',
              });
            });
        } else {
          //Error handling if user exists
          return next({
            log: 'the user already exists when creating user',
            status: 409,
            message: 'User already exists',
          });
        }
      })
      //Catch-all error if the findOne call fails
      .catch((error) => {
        return next({
          log: 'error in finding user first in sign up page' + error.message,
          message: 'Failed to find user',
        });
      });
    //Error handling if not enough data is sent
  } else {
    return next({
      log: 'missing data in creating student',
      status: 400,
      message: 'missing data: cannot find email or password in req.body',
    });
  }
};
//Check user has valid log-in info
userController.verifyUser = (req, res, next) => {
  console.log('backend called');
  const { username, password } = req.body;
  if (username && password) {
    User.findOne({ username })
      //Error handling if no user is found
      .then((thisUser) => {
        if (thisUser === null) {
          return next({
            log: 'cannot find the user in database',
            status: 401,
            message: 'Invalid information',
          });
        }
        //Compare passwords to verify log-in info
        bcrypt
          .compare(password, thisUser.password)
          .then((isMatch) => {
            if (isMatch) {
              res.locals.currentUser = thisUser;
              return next();
              //Err handling if password is incorrect/unauthorized
            } else {
              return next({
                log: 'password and record does not match',
                status: 401,
                message: 'Invalid information',
              });
            }
          })
          //Error handling if bcrypt fails
          .catch((err) => {
            return next({
              log: 'fail to compare hashed pwd to input pwd' + err.message,
              message: 'Server error in bcrypt compare',
            });
          });
        //Error finding the user
      })
      .catch((err) => {
        return next({
          log: 'error in finding user first in login page' + err.message,
          message: 'login failed',
        });
      });
  } else {
    //error handling if not enough info is sent
    return next({
      log: 'cannot find email/pwd in req.body',
      status: 400,
      message: 'missing data: cannot find email or password in req.body',
    });
  }
};
module.exports = userController;
