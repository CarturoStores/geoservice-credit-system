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
    const urlBase = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${process.env.API_KEY}`;
    const url = axios(urlBase);
    res.json({ currentLocation: 'Receiving address' });
  });
  
  module.exports = router;