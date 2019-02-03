import React, { Component } from 'react';
import Map from './GoogleMaps';
import './App.css';

class App extends Component {
  state = { address: ''}

  onAddressChange = (event) => {
    this.setState({ address: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.address} onChange={this.onAddressChange}/>
        <Map />
      </div>

    );
  }
}

export default App;
