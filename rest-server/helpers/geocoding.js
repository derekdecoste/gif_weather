const config = require('../helpers/config.js');
const request = require('request');

var getData = function (city, cb) {
  let options = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${config.GEO_TOKEN}`
  }
  request(options, cb);
};

module.exports.getData = getData;