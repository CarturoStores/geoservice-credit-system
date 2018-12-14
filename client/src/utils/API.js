import axios from "axios";

export default {
  getKey: function() {
    return process.env.API_KEY;
  },
  // Gets all geocoding address
  getAllAddress: function() {
    return axios.get("/api/address/all");
  },
  // Gets each geocoding address
  getOneAddress: function() {
    return axios.get("/api/address/get");
  },
  // Create a address or location
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