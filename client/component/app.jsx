import React from 'react';
import Weather from './weather.jsx';
import '../public/css/style.css';
const axios = require('axios');

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 34,
      lon: -118,
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
    this.search = this.search.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
  }

  componentDidMount() {
    //this.search(this.state.lon, this.state.lat);
    if (navigator.geolocation) {
      this.geoSuccess();
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }
  }
  
  geoSuccess() {
    var refThis = this;
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords.latitude, pos.coords.longitude);
      refThis.setState({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
      this.search(pos.coords.longitude, pos.coords.latitude);
    });
    //document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  }

  search(lon, lat) {
    var refThis = this;
    console.log('searching...lat then lon ', lat, lon)
    // $.post('/search', {lon: lon, lat: lat} , (dataPost) => { // make this restful later but for now display data on page
    //   //$.get('/search', (dataGet) => {
    //     var temp = JSON.parse(dataPost);
    //     console.log('post data ', temp);
    //   this.setState({ weather: temp});
    //   //});
    // });

    axios.post('/search', {
      lon: lon,
      lat: lat
    })
    .then((dataPost) => {
      console.log('post data ', dataPost);
      refThis.setState({
        weather: dataPost.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className ="container">
        <div className="mapAndSearch">
          <br></br>
          <iframe id="map"
              width="600"
              height="450"
              frameborder="0" style={{border:0}}
              src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyD-wL3HWTzUKcYv8jUqusUYNRidG1B8OX0&center=${this.state.lat},${this.state.lon}
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


