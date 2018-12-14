import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import API from '../../utils/API';

class CreditMap extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      address: [],
      markerList: [],
      username: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      lat: 33.7756,
      lng: -84.3963
    }
  };

  loadAddress = () => {
    API.getAllAddress()
      .then(res => this.setState({ address: res.data }))
      .catch(err => console.log(err));
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  fetchPlaces(mapProps, map) {
    const { google } = mapProps;
    const service = new google.maps.places.PlaceService(map);
  }
  
  componentDidMount = () => {
    this.addLocation();
    this.loadAddress();
  };

  displayMarker(lists) {
    return lists.map(({ lat, lng, name }) => (
      <Marker
        className={"Gtech"}
        desitnation={"Test 1"}
        position={{ lat, lng }}
        onClick={this.onMarkerClick}
        name={name}
      />
    ));
  }

  addLocation = () => {
    let counter = 0;
    var startMarker = window.setInterval(
      function() {
        counter++;

        // TODO
        // Remember to change the name of the destination array
        if (this.state.address.length - 1 > counter) {
          this.setState({
            data: [...this.state.data, this.state.address[counter]], // TODO Remember to change the name of the destination array
            lat: this.state.address[counter].lat,
            lng: this.state.address[counter].lng
          });
          return;
        }
        window.clearInterval(startMarker);
      }.bind(this),
      3000
    );
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  
  render() {
    if (!this.props.loaded) {
      return <div>Loading</div>;
    }

    console.log("State: ", this.state);

    console.log("Lat: ", this.state.address.latitude);
    console.log("Lng: ", this.state.address.longitude);

    return (
      <Map
        google={this.props.google}
        initialCenter={{
          // Atlanta, GA Coordinates
          lat: 33.749,
          lng: -84.388
        }}
        center={{
          lat: this.state.lat,
          lng: this.state.lng
        }}
        zoom={8}
        onClick={this.onMapClicked}
      >
        {/* Miami - Marker hardcoded we need to add lat & lng for major US states and possible major countries */}
        {this.displayMarker(this.state.address)}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API.getKey()
})(CreditMap);