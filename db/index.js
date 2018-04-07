const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/weather');

let weatherSchema = mongoose.Schema({
  latitude: Number,
  longitude: Number,
  time: Date,
  currentSummary: String,
  currentIcon: String,
  currentTemperature: Number,
  dailySummary: String,
  dailyHigh: Number,
  dailyLow: Number,
  dailyPrecipProbability: Number,
});

let Weather = mongoose.model('Weather', weatherSchema);

let save = (weather, cb) => {
  var data = new Weather(weather);
  data.save((err, success)=> {
    if(err) throw err;
    cb(success);
  });
}

module.exports.save = save;