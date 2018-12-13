require('dotenv').config({
  silent: true
});
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const db = require('../../models');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = db.User;

// @route   GET api/users/test
// @desc    Testing User routes
// @access  Public
router.get('/test', (req, res) => {
  res.json({
    msg: 'Router works'
  })
});

// @route   GET api/users/
// @desc    Receiving Users records
// @access  Public
router.get('/', (req, res) => {
  res.json({
    msg: 'Receiving users'
  })
});

// @route   GET api/users/
// @desc    Receiving Users records
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ where: {email: req.body.email} })
    .then(user => {
      // user will be the first entry of the users table with the email 'daverioverde' || null
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });

        bcrypt.genSalt(10, (_, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            db.User.create(
              Object.assign(req.body, { password: hash, avatar, createdAt: Date.now() })
            ).then(user => {
              res.json(user);
            }).catch(err => {
              return res.status(400).send(err);
            });
          });
        });
      }
    })
})

module.exports = router;