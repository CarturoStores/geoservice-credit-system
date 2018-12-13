require('dotenv').config({
    silent: true
  });
  const express = require('express');
  const router = express.Router();
  const db = require('../../models');

  // Another alternative querying gooapis
  const requestify = require('requestify');
  
  // @route   GET api/address/test
  // @desc    Testing Address routes
  // @access  Public
  router.get('/test', (req, res) => {
    res.json({
      msg: 'Router works'
    })
  });

  // @route   GET api/address/geocode
  // @desc    Receiving Geocoding data
  // @access  Public
  router.get('/geocode', (request, response) => {
    const address = request.body.address;
    const api_key = request.body.api_key;
    urlBase = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api_key || process.env.API_KEY}`;
    requestify.get(urlBase)
      .then(res => {
        const result = res.getBody();
        response.json({ currentGeoLocation: result });
      })
      .catch(err => {
        return res.status(404).json({ err: 'Unexpected Error Ocurred' });
      });
  });

  // @route   POST api/address/geocode
  // @desc    Storing a new geocode record
  // @access  Public
  router.post('/geocode', (req, res) => {
    db.Geocoder.create(Object.assign(req.body,{
      address: req.body.address, // receive complete address
      token: 'token', // generate Token
      zip_code: req.body.zip_code, // zipCode
      latitude: req.body.latitude, // latitude
      longitude: req.body.longitude, // longitude
      state: req.body.state, // state
      street_number: req.body.street_number, // street number
      createdAt: Date.now() // created date
    }))
    .then(geocoder => res.json(geocoder))
    .catch(err => {
      return res.status(400).send(err);
    });
  });
  
  module.exports = router;