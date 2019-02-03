import React from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow, Polygon } from 'google-maps-react';

export class MapContainer extends React.Component {
  state = { 
    center: null,
    activeMarker: null,
    showingInfoWindow: false,
  };
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({ center: { 
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }});
      });
    }
  }  

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

    render() {
      const points = [
        {location:[45.478743, -73.579878], weight: 1},
        {location:[45.500088, -73.564600], weight: 1},
        {location:[45.500087, -73.564600], weight: 1},
        {location:[45.500086, -73.564600], weight: 1}
      ];
      const triangleCoords = [
        {lat: 45.478743, lng: -73.579878},
        {lat: 45.493037, lng: -73.594428},
        {lat: 45.520274, lng: -73.570817},
        {lat: 45.506047, lng: -73.551534}
      ];
      const montRoyal = [
        {lat: 45.498484, lng: -73.615154},
        {lat: 45.514021, lng: -73.591550},
        {lat: 45.511095, lng: -73.581329},
        {lat: 45.496165, lng: -73.595004},
      ]
      return (
        <Map 
          google={this.props.google} 
          onClick={this.onMapClicked}
          zoom={19}
          initialCenter={{
            lat: 45.500089,
            lng: -73.564600
          }}
          center={this.props.location}
          yesIWantToUseGoogleMapApiInternals
          data={[{lng: 45.500089, lat:-73.564600}]}
          defaultData={[new window.google.maps.LatLng(45.500089, -73.564600)]}
          mapTypeControl = {false}
          streetViewControl = {false}
          fullscreenControl = {false}
          mapTypeControl = {false}
          zoom={19}

          styles={[{
            featureType: 'poi',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'transit',
            stylers: [{visibility: 'off'}]
          },
          {
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          }
          ]}
        >
          <Marker 
            name="Test"
            onClick={this.onMarkerClick}
            position={this.props.location}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <strong>Distance to towers:</strong>
                <br />
                Telus
                <br />
                Rogers
                <br />
                Bell
              </div>
          </InfoWindow>
          <Polygon
          paths={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35} />
          <Polygon
          paths={montRoyal}
          strokeColor="#f4e242"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#f4e242"
          fillOpacity={0.6} />
        </Map>
        
      );
    }
    

  }
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD0CqwnsGxlFN4GKzegF6cvHfD1Cjzj8OM',
  mapTypeControl: false
})(MapContainer)