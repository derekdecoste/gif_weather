const config = require('../helpers/config.js');
const request = require('request');

var getData = function (lat, lon, cb) {
  let options = {
    url: `https://api.darksky.net/forecast/${config.WEATHER_TOKEN}/${lat},${lon}`
  }
  request(options, cb);
};

module.exports.getData = getData;