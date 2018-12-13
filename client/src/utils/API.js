import axios from "axios";

export default {
  // Gets all geocoding address
  getAddress: function() {
    return axios.get("/api/address/geocode");
  },
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users/");
  }
};