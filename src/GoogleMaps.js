import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
    render() {
      return (
        <Map google={this.props.google} zoom={14}>

        </Map>
      );
    }
  }
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD0CqwnsGxlFN4GKzegF6cvHfD1Cjzj8OM'
})(MapContainer)