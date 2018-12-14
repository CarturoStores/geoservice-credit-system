const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBucketListInput(data) {
  let errors = {};

  data.location = !isEmpty(data.location) ? data.location : "";

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};