import axios from "axios";

export default {
  // Gets all geocoding address
  getAllAddress: function() {
    return axios.get("/api/address/all");
  },
  // Gets each geocoding address
  getOneAddress: function() {
    return axios.get("/api/address/:id");
  },
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users/");
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