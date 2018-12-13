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
});

// @route   GET api/users/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ where: { email }})
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(400).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //User matched
            const payload = { 
              id: user.id, 
              firstName: user.firstName, 
              lastName: user.lastName,
              avatar: user.avatar
            }; // create JWT payload

            //sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },// expires in 1 hr
              (_, token) => {
                res.json({
                  success: true,
                  toke: 'Bearer ' + token
                });
              }
            );
          } else {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }
        });
    });
});

// @route   GET api/users/current
// @desc    Protected user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  });
});

module.exports = router;