require('dotenv').config({
    silent: true
  });
  const express = require('express');
  const router = express.Router();
  const axios = require('axios');
  const http = require('http');

  // Another alternative querying gooapis
  const requestify = require('requestify');
  
  router.get('/test', (req, res) => {
    res.json({
      msg: 'Router works'
    })
  });

  router.get('/', (request, response) => {
    const urlBase = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+parkway,+Mountain+View,+CA&key=${process.env.API_KEY}`;
    requestify.get(urlBase)
      .then(res => {
        console.log(res.getBody());
        const result = res.getBody();
        response.json({ currentGeoLocation: res.getBody() });
    })
  });
  
  module.exports = router;