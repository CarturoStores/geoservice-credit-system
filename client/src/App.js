import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import API from './utils/API';
import { setCurrentUser, logoutUser } from './actions/userAuthActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
// import Landing from './components/layout/Landing';
// import Dashboard from './components/dashboard/Dashboard';
// import AddCredit from './components/add-credit/AddLocation';
// import EditCredit from './components/edit-credit/EditCredit';
// import AddLocation from './components/add-location/AddLocation';
// import Login from './components/auth/Login';
// import Login2 from './components/auth/Login2';
// import NotFound from './components/not-found/NotFound';

import './App.css';

// check token
if (localStorage.jwtToken) {
  API.setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
