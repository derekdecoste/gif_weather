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
    var city = data.toString().slice(5);
    geocoding.getData(city, (err, response, geoBody) => {
      if(err) {
        console.log('error getting geodata ', err);
      } else {
        var geo = JSON.parse(geoBody);
        if(geo.results.length) {
          var lat = geo.results[0].geometry.location.lat;
          var lon = geo.results[0].geometry.location.lng;
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
                  res.send(JSON.stringify(weather));
                });
              } else {
                  res.send('weather was undefined')
              }
              }
            });
          }
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