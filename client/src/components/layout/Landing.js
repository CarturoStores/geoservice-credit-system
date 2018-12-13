import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/userAuthActions';
import { loginUser } from '../../actions/userAuthActions';
import Map from '../map/Map';