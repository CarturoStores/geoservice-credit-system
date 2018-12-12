import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class CreditMap extends Component {

  static defaultProps = {
    api_key:'',
    center: {
      lat: 33.74,
      lng: 84.38
    },
    zoom: 11
  };
  
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.api_key }}
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }
        >
          <AnyReactComponent
            lat={33.7490}
            lng={84.3880}
            text={'Atlanta GA'}
          />
        </GoogleMapReact>
      </div>
    )
  }
}
