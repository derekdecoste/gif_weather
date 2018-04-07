const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const weather = require('./helpers/weather.js')
const db = require('../db/index.js')

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.post('/search', (req, res) => {
  req.on('data', data => {
    var arr = data.toString().split("=");
    var lat = Number(arr.pop());
    arr = arr[1].toString().split("&");
    var lon = Number(arr.shift());
    weather.getData(lat, lon, (err, resp, body) => {
      if(err) {
        console.log('error getting data', err)
      } else {
        var weather = JSON.parse(body);
        if(weather.latitude) {
        var t = new Date(weather.currently.time*1000);
        weather = { // I want to pass this weather object back up to react to update the DOM w/
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
  });
});

app.get('/search', (req, res) => {
  res.end();
});

app.listen(PORT, () => {
  console.log(`Successfully connected to port: ${PORT}`);
});