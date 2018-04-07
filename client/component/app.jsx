import React from 'react';
import Search from './search.jsx';
import Weather from './weather.jsx';
import $ from 'jquery';
import '../public/css/style.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 34,
      lon: -118,
      latLock: 34,
      lonLock: -118,
      weather: {
        latitude: '',
        longitude: '',
        time: '',
        currentSummary: '',
        currentIcon: '',
        currentTemperature: '',
        dailySummary: '',
        dailyHigh: '',
        dailyLow: '',
        dailyPrecipProbability: '',
      }
    }
    this.onLatChange = this.onLatChange.bind(this);
    this.onLonChange = this.onLonChange.bind(this);
    this.onPush = this.onPush.bind(this);

  }

  componentDidMount() {
    this.search(this.state.lon, this.state.lat);
  }

  search(lon, lat) {
    console.log('searching...lat then lon ', lat, lon)
    $.post('/search', {lon: lon, lat: lat} , (dataPost) => { // make this restful later but for now display data on page
      //$.get('/search', (dataGet) => {
        var temp = JSON.parse(dataPost);
        console.log('post data ', temp);
      this.setState({ weather: temp});
      //});
    });
  }

  onLatChange(e) {
    this.setState({ lat: e });
    console.log(this.state.lat, ' is the lat and lon is ', this.state.lon, ' and lonLock is ', this.state.lonLock, ' and latLock is ', this.state.latLock);
    return false;
  }

  onPush() {
    this.setState({ latLock: this.state.lat, lonLock: this.state.lon});
    this.search(this.state.lon, this.state.lat);
  }

  onLonChange(e) {
    this.setState({ lon: e });
    return false;
  }

  initMap() {
    // map = new google.maps.Map(document.getElementById('map'), {
    //   center: {lat: -34.397, lng: 150.644},
    //   zoom: 8
    //})
  }

  render() {
    return (
      <div className ="container">
        <div className="mapAndSearch">
          <Search lon={this.state.lon} lat={this.state.lat} onPush ={this.onPush} onLatChange={this.onLatChange} onLonChange={this.onLonChange}/>
          <br></br>
          <iframe id="map"
              width="600"
              height="450"
              frameborder="0" style={{border:0}}
              src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyD-wL3HWTzUKcYv8jUqusUYNRidG1B8OX0&center=${this.state.latLock},${this.state.lonLock}
              &zoom=7`} allowfullscreen>
          </iframe>
        </div>
        <div className="weather">
          <Weather weather={this.state.weather}/>
        </div>
      </div>
    )
  }
}

export default App;


