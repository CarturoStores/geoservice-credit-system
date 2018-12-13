const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateGeocodeInput(data) {
  let errors = {};

  data.lat = !isEmpty(data.lat) ? data.lat : '';
  data.lng = !isEmpty(data.lng) ? data.lng : '';
  //check if the string is a postal code
  const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  const isValidZip = regex.test(data.zip_code);
  
  if (!isValidZip) {
    errors.zip_code = 'Zip Code is invalid'
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
}