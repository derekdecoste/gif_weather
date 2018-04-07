const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const weather = require('./helpers/weather.js')
const db = require('../db/index.js')
const geocoding = require('./helpers/geocoding.js')

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.post('/search', (req, res) => {
  req.on('data', data => {
    // send to google's api to get lat and lon here, in success of this, call getData below
    var city = data.toString().slice(5);
    console.log('city is ', city)
    geocoding.getData(city, (err, response, geoBody) => {
      if(err) {
        console.log('error getting geodata ', err);
      } else {
        var geo = JSON.parse(geoBody);
        var lat = geo.results[0].geometry.location.lat;
        var lon = geo.results[0].geometry.location.lng;
        console.log('calced lat is ', lat, ' calced lon is ', lon)
        console.log(typeof lat, typeof lon)
        if(lat !== '') {
          weather.getData(lat, lon, (err, resp, body) => {
            if(err) {
              console.log('error getting data', err)
            } else {
              var weather = JSON.parse(body);
              if(weather.latitude) {
              var t = new Date(weather.currently.time*1000);
              weather = {
                latitude: weather.latitude,
                longitude: weather.longitude,
                time: t,
                currentSummary: weather.currently.summary,
                currentIcon: weather.currently.icon,
                currentTemperature: weather.currently.temperature,
                dailySummary: weather.daily.data[0].summary,
                dailyHigh: weather.daily.data[0].temperatureHigh,
                dailyLow: weather.daily.data[0].temperatureLow,
                dailyPrecipProbability: weather.daily.data[0].precipProbability,
              };
              db.save(weather, () => {
                console.log('i think this was saved ', weather);
                res.send(JSON.stringify(weather));
              });
            } else {
                res.send('weather was undefined')
            }
            }
          });
        }
    }
  });
  });
});

app.get('/search', (req, res) => {
  res.end();
});

app.listen(PORT, () => {
  console.log(`Successfully connected to port: ${PORT}`);
});