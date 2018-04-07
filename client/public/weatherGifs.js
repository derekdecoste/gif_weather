var weatherGifDecider = function(weather) {
  
  var weatherGifs = {
    'weather': ['https://thumbs.gfycat.com/SlimyMistyDarklingbeetle-size_restricted.gif', 'https://media.giphy.com/media/M9HhHPtrAzOvK/giphy.gif'],
    'snow': ['https://media1.tenor.com/images/ea6a65bbe16c9c0f8bd6a333102a74ff/tenor.gif?itemid=3826508', 'https://thumbs.gfycat.com/ImpassionedImpassionedDragonfly-size_restricted.gif'],
    'hot': ['http://cdn.playbuzz.com/cdn/3e7025d8-d3a7-453c-9c7c-58d53f75a109/dd7d5a4a-8fb9-4ea3-8e97-bcde97a35a23.gif', 'https://runeatrepeat.com/wp-content/uploads/2014/05/its-too-hot.gif'],
    'rain': ['https://media1.tenor.com/images/8018ec9fbbef0a1d7ba9956e3064d0c8/tenor.gif?itemid=5516318'] //, 'https://media1.tenor.com/images/37dc70697cd77dec8b10bfca7ab8d7ae/tenor.gif?itemid=4698036'
  }

  if (weather.currentIcon === 'snow') {
    return weatherGifs.snow[Math.floor(Math.random()*weatherGifs.snow.length)];
  }
  
  if(weather.currentIcon === 'rain' || weather.currentIcon === 'sleet' || Number(weather.dailyPrecipProbability) > .2) {
    return weatherGifs.rain[Math.floor(Math.random()*weatherGifs.rain.length)];  
  } 
    
  if (Number(weather.dailyHigh) > 80) {
    return weatherGifs.hot[Math.floor(Math.random()*weatherGifs.hot.length)];  
  } else {
    return weatherGifs.weather[Math.floor(Math.random()*weatherGifs.weather.length)];  
  }
};

module.exports.weatherGifDecider = weatherGifDecider;