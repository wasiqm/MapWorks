import React from 'react';
import {Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainer extends React.Component {
    state = { center: null };
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

    render() {
      const points = [
        {location:[45.500089, -73.564600], weight: 2}
      ];
      return (
        <Map 
          google={this.props.google} 
          zoom={14}
          initialCenter={{
            lat: 45.500089,
            lng: -73.564600
          }}
          center={this.state.center}
          yesIWantToUseGoogleMapApiInternals
          google={this.props.google}
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
                weight: point['weight']}))
            });
            heatmap.setMap(map);

          }}

        >
          <Marker 
            name="Test"
          />
        </Map>
        
      );
    }
    

  }
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD0CqwnsGxlFN4GKzegF6cvHfD1Cjzj8OM',
  mapTypeControl: false
})(MapContainer)