require('dotenv').config({
  silent: true
});
const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/api/users.js');
const address = require('./routes/api/address.js');
const profile = require('./routes/api/profile');
const app = express();
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

app.use(morgan("tiny")); // logging framework

app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Requiring our models for sync
const db = require('./models');

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/address', address);
app.use('/api/profile', profile);


// Serve up static assets (usually on heroku) if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

// DB config
db.sequelize.sync()
  .then(() => {  
    app.listen(port, () => {
      console.log(`Credit Server listening on: http:localhost: ${port}`);
    });
  })