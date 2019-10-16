module.exports = (app) => {
  const users = require('../controllers/user.controller.js');

  // Create a new User
  app.post('/users', users.create);

  // Retrieve a single User with userId
  app.get('/users/:userId', users.findOne);

  // Retrieve all Users
  app.get('/users', users.findAll);
};
