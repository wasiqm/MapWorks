import React from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

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
        {location:[45.500089, -73.564600], weight: 1},
        {location:[45.500088, -73.564600], weight: 1},
        {location:[45.500087, -73.564600], weight: 1},
        {location:[45.500086, -73.564600], weight: 1}
      ];
      return (
        <Map 
          google={this.props.google} 
          onClick={this.onMapClicked}
          zoom={14}
          initialCenter={{
            lat: 45.500089,
            lng: -73.564600
          }}
          center={this.state.center}
          yesIWantToUseGoogleMapApiInternals
          mapTypeControl = {false}
          streetViewControl = {false}
          fullscreenControl = {false}
          mapTypeControl = {false}
          zoom={14}
          invert_lightness = {true}

          styles={[{
            featureType: 'poi',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'transit',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'roads',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          }
          ]}

          onGoogleApiLoaded={({map, maps}) => {
            const heatmap = new maps.visualization.HeatmapLayer({
              data: points.map(point => (
                {location: new maps.LatLng(point['location'][1], point['location'][0]),
                weight: point['weight']})),
              radius: 20,
            });
            heatmap.setMap(map);

          }}

        >
          <Marker 
            name="Test"
            onClick={this.onMarkerClick}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>Kevin</h1>
              </div>
          </InfoWindow>
        </Map>
        
      );
    }
    

  }
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD0CqwnsGxlFN4GKzegF6cvHfD1Cjzj8OM',
  mapTypeControl: false
})(MapContainer)