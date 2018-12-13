import axios from 'axios';
import API from '../utils/API';
import jwt_decode from 'jwt_decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      history.push('/login');
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to LocalStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      API.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set user logout
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem('jwtToken');
  API.setAuthToken(false);
  dispatch(setCurrentUser({}));
}