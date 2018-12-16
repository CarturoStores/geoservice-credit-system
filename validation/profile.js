const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.location = !isEmpty(data.location) ? data.location : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {   
      errors.twitter = "Twitter website not a Valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {   
      errors.facebook = "Facebook website not a Valid URL";
    }
  } 

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {   
      errors.instagram = "Instagram website not a Valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};