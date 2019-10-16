const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

// Create and Save a new User
exports.create = (req, res) => {
  const token = req.headers['x-access-token'] || "";
  authenticate(token, res, (error, response) => {
    if (!error) {
      // Validate request
      if (!req.body.firstName && !req.body.emailId) {
        return res.status(400).send({
          message: "User content can not be empty"
        });
      }
      // Create a User
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        phone: req.body.phone
      });
      // Save User in the database
      user.save()
        .then(data => {
          res.status(200).send({
            user: data,
            error: null,
            message: 'Auth OK'
          });
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
          });
        });
    } else {
      return res.status(response.code).send({
        auth: false,
        message: "Error: " + response.message
      });
    };
  });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  const token = req.headers['x-access-token'] || "";
  authenticate(token, res, (error, response) => {
    if (!error) {
      User.findById(req.params.userId)
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: "User not found with id " + req.params.userId
            });
          } else {
            return res.status(200).send({
              user: user,
              message: "Auth OK"
            });
          };
        }).catch(err => {
          if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: "User not found with id " + req.params.userId
            });
          };
          return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId

          });
        });
    } else {
      return res.status(response.code).send({
        auth: false,
        message: "Error: " + response.message
      });
    };
  });
};


// Find all Users
exports.findAll = (req, res) => {
  const token = req.headers['x-access-token'] || "";
  authenticate(token, res, (error, response) => {
    if (!error) {
      User.find({})
        .then(users => {
          if (!users) {
            return res.status(404).send({
              message: "Users not found."
            });
          } else {
            return res.status(200).send({
              users: users,
              message: "Auth OK"
            });
          };
        }).catch(err => {
          return res.status(500).send({
            message: "Error retrieving users: " + err
          });
        });
    } else {
      return res.status(response.code).send({
        auth: false,
        message: "Error: " + response.message
      });
    };
  });
};


// Common auth function
var authenticate = function(token, res, callback) {
  if (!token) {
    callback(true, {
      code: 401,
      message: "No token provided."
    });
  } else {
    token = jwt.sign({}, token);
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        callback(true, {
          code: 500,
          message: "Failed to authenticate token."
        });
      } else {
        callback(null, true);
      };
    });
  };
};
