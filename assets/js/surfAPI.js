// https://api.surfline.com/v1/forecasts/5842041f4e65fad6a7708a65?
// 'https://services.surfline.com/kbyg/spots/forecasts/wave?spotid=5842041f4e65fad6a7708a65'

var waveHeightsList = document.getElementById('waveHeightDisplay')
var carolina =  document.getElementById('carolina')
var wrightsville =  document.getElementById('wrightsville')
var surfCity =  document.getElementById('surfcity')
var apiURL;


var beaches = ['5842041f4e65fad6a7708a65', '5842041f4e65fad6a7708a58', '5842041f4e65fad6a7708a49']
var responseAPI;

var timeboxesHigh = [0,0,0,0,0,0,0,0]
var timeboxesLow = [0,0,0,0,0,0,0,0]


surfCall('https://services.surfline.com/kbyg/spots/forecasts/?spotId='+ beaches[0] +'&days=3&intervalHours=12&maxHeights=false');

wrightsville.addEventListener('click', function() {
  buildURL(0)
})
carolina.addEventListener('click', function() {
  buildURL(1)
})
surfCity.addEventListener('click', function() {
  buildURL(2)
  console.log('surfcity')
})




function buildURL(a){
    apiURL = 'https://services.surfline.com/kbyg/spots/forecasts/?spotId='+ beaches[a] +'&days=3&intervalHours=12&maxHeights=false';
    surfCall(apiURL);
}

function surfCall(url) {
  $.ajax({
      url: url,
      method: 'GET',
    })
    .then(function (response) {
      console.log(response);
      responseAPI = response;
      printData();
    })
    .catch(function (error) {
      console.log('error:', error);
    });
}


function printData() {
  for (i=0; i < 8 ; i++) {
    console.log(responseAPI.data.forecasts[i].timestamp)
    var s = new Date(responseAPI.data.forecasts[i].timestamp *1000); 
    console.log(s.toLocaleDateString())
    console.log(s.toTimeString())
    timeboxesHigh[i] = responseAPI.data.forecasts[i].surf.max
    timeboxesLow[i] = responseAPI.data.forecasts[i].surf.min
  }
  updateWaveHeights();

}

function updateWaveHeights() {
  for (i=0; i < 8 ; i++) {
    waveHeightsList.children[0].children[i].style.height = timeboxesHigh[i] * 30 + 'px'
    waveHeightsList.children[1].children[i].style.height = timeboxesLow[i] * 30 + 'px'
  }
}

// midnight today
// 3am today
// 