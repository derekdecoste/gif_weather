import React from 'react';
import '../public/css/style.css';
import weatherGifs from'../public/weatherGifs.js';

class Weather extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    const differentTime = this.props.weather.time !== nextProps.weather.time;
    return differentTime;
}

  render() {
    return (
      <div>
        <div id="currentWeather">
          Currently {this.props.weather.currentSummary} and {Math.floor(this.props.weather.currentTemperature)} degrees
        </div>
        <img id="gif" src={weatherGifs.weatherGifDecider(this.props.weather)}/>
      </div>
    )
  }
}

export default Weather;