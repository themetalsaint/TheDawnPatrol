// https://api.surfline.com/v1/forecasts/5842041f4e65fad6a7708a65?
// 'https://services.surfline.com/kbyg/spots/forecasts/wave?spotid=5842041f4e65fad6a7708a65'

var beaches = ['5842041f4e65fad6a7708a65']
var responseAPI;


surfCall();

function surfCall() {
  $.ajax({
      url: 'https://services.surfline.com/kbyg/spots/forecasts/?spotId=5842041f4e65fad6a7708a65&days=3&intervalHours=12&maxHeights=false',
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
    
  }

}

// midnight today
// 3am today
// 