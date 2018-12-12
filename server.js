const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/api/users.js');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Use Routes
app.use('/api/users', users);

const port = process.env.PORT || 4200;

// DB config
db.sequelize.sync()
  .then(() => {  
    app.listen(port, () => {
      console.log(`Credit Server listening on: http:localhost: ${port}`);
    });
  })