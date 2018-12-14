const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVisitedInput(data) {
  let errors = {};

  data.location = !isEmpty(data.location) ? data.location : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  if (Validator.isEmpty(data.to)) {
    errors.to = "To date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};