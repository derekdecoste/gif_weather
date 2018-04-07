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
      city: 'Los Angeles, CA',
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
    this.onPush = this.onPush.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    this.search(this.state.city);
  }

  search(city) {
    var str = city.replace(/,/g, '');
    $.post('/search', {city: str} , (dataPost) => {
        var temp = JSON.parse(dataPost);
        this.setState({ weather: temp, lat: temp.latitude, lon: temp.longitude});
    });
  }

  onPush() {
    this.search(this.state.city);
  }

  onChange(e) {
    this.setState({ city: e.target.value})
  }

  render() {
    return (
      <div className ="container">
        <div className="mapAndSearch">
          <Search onPush={this.onPush} onChange={this.onChange}/>
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


