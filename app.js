const express = require('express');
const bodyParser = require('body-parser');


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Error: ', err);
  process.exit();
});

// listen for requests
module.exports = app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// Require User routes
require('./app/routes/user.routes.js')(app);
