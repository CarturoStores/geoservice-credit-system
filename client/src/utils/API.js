import axios from "axios";

export default {
  getKey: function() {
    return process.env.API_KEY;
  },
  // Gets all geocoding address per call
  getAllAddress: function() {
    return axios.get("/api/address/all");
  },
  // Gets each geocoding address per call
  getOneAddress: function() {
    return axios.get("/api/address/geocode/");
  },
  // Gets google timezone address per call
  getTimeZoneAddress: function() {
    return axios.get("/api/address/timezone/");
  },
  // Create a address or location per cll
  createAnAddress: function() {
    return axios.get("/api/address/create");
  },
  // Token setup
  setAuthToken: token => {
    if (token) {
      // Apply to every request
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
};