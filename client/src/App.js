import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import API from './utils/API';
import { setCurrentUser, logoutUser } from './actions/userAuthActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddVisited from "./components/add-appointment/AddVisited";
import AddAppointmentlist from "./components/add-appointment/AddAppointmentlist";
import Login from './components/auth/Login';
import Login2 from './components/auth/Login2';
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from './components/not-found/NotFound';

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
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/login2" component={Login2} />
            <div className="container">
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-visited"
                  component={AddVisited}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-bucketlist"
                  component={AddAppointmentlist}
                />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <br />
            <br />
            <br />
            <div>
              <Footer />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
