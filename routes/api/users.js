require('dotenv').config({
  silent: true
});
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/test', (req, res) => {
  res.json({
    msg: 'Router works'
  })
});
router.get('/', (req, res) => {
  res.json({
    msg: 'Receiving users'
  })
});

module.exports = router;