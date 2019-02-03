import React, { Component } from 'react';
import logo from './logo.svg';
import Map from './GoogleMaps';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        
        <form>
        <input type="text" name="search" placeholder="Search..." />
        </form>
        <Map />
      </div>

    );
  }
}

export default App;
