const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const weather = require('./helpers/weather.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, '../client/public')));

app.post('/search', (req, res) => {
  console.log(req.body)
  var lat = req.body.lat, lon = req.body.lon;
  weather.getData(lat, lon, (err, resp, body) => {
    if(err) {
      console.log('error getting data', err)
      res.send(err);
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
        res.send(JSON.stringify(weather));
      } else {
          res.send('weather was undefined')
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Successfully connected to port: ${PORT}`);
});