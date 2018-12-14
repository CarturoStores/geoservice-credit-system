require('dotenv').config({
    silent: true
  });
  const google = require('node-geocoder');
  const express = require('express');
  const router = express.Router();
  const passport = require("passport");
  const db = require('../../models');

  // Another alternative querying gooapis
  const requestify = require('requestify');
  
  // Load Input Validation
  const validateGeocoderInput = require('../../validation/validate');

  // Load User model
  const Geocoder = db.Geocoder;

  // batch multiple geocoding addresses services
  getMultiplesAddress = (addresses, done) => {
    let coords = [];

    addresses.forEach(address => {
      const geocoder = new google.maps.Geocoder();
      if (geocoder) {
        geocoder.geocode({'address':address}, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            coords.push(results[0].geometry.location);
            if( typeof done == 'function' ) {
              done();
            }
          } 
          else {
            throw('No results found: ' + status);
          }
        });
      }
    });
  }
  
  //Usage
  // @route   GET api/address/all
  // @desc    // Finding multiple address
  // @access  Public
  router.get('/all', passport.authenticate("jwt", { session: false }), async (req, res) => {
    // Do something after getting done with Geocoding of multiple addresses
    Geocoder.findAll()
      .then(addressList => res.json(addressList))
      .catch(err => res.status(404).json({ errors: 'Error Have Been Occurred'}));
  });
  
  // @route   GET api/address/test
  // @desc    Testing Address routes
  // @access  Public
  router.get('/test', (req, res) => {
    res.json({
      msg: 'Address Router works'
    })
  });

  // @route   GET api/address/geocode/
  // @desc    Receiving Geocoding data
  // @access  Public
  router.get('/geocode/', passport.authenticate("jwt", { session: false }), async (request, response) => {
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

  // @route   GET api/address/timezone/
  // @desc    Receiving Google Time Zone
  // @access  Public
  router.get('/timezone/', passport.authenticate("jwt", { session: false }), async (request, response) => {
    const location = {
      lat: request.body.lat,
      lng: request.body.lng
    };
    const timestamp = request.body.timestamp;
    const api_key = request.body.api_key;
    // const location = '39.6034810,-119.6822510';
    urlBase = `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${timestamp}&key=${api_key || process.env.API_KEY}`;
    requestify.get(urlBase)
      .then(res => {
        const result = res.getBody();
        response.json({ currentGooTimeZone: result });
      })
      .catch(err => {
        return res.status(404).json({ err: 'Unexpected Error Ocurred' });
      });
  });

  // @route   POST api/address/geocode
  // @desc    Storing a new geocode record
  // @access  Public
  router.post('/create', passport.authenticate("jwt", { session: false }), async (req, res) => {

    const find = {
      zip_code: req.body.zip_code,
      state: req.body.state
    };

    const { errors, isValid } = validateGeocoderInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Geocoder.findOrCreate({ where: find, defaults: Object.assign(req.body,{
      address: req.body.address, // receive complete address
      token: 'token', // generate Token
      zip_code: req.body.zip_code, // zipCode
      latitude: req.body.latitude, // latitude
      longitude: req.body.longitude, // longitude
      state: req.body.state, // state
      street_number: req.body.street_number, // street number
      createdAt: Date.now() // created date
    })})
    .then(geocoder => res.json(geocoder))
    .catch(err => console.log(err));
  });
  
  module.exports = router;