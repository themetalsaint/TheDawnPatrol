var waveHeightsList = document.getElementById('waveHeightDisplay')
var carolina =  document.getElementById('carolina')
var wrightsville =  document.getElementById('wrightsville')
var surfCity =  document.getElementById('surfcity')
var surfer =  document.getElementsByClassName('surfer')
var apiURL;
var currentTime = moment().format("HH")
const mediaQuery = window.matchMedia('(max-width: 950px)')

var beaches = ['5842041f4e65fad6a7708a65', '5842041f4e65fad6a7708a58', '5842041f4e65fad6a7708a49']
var responseAPI;

var timeboxesHigh = [0,0,0,0,0,0,0,0]
var timeboxesLow = [0,0,0,0,0,0,0,0]


surfCall('https://services.surfline.com/kbyg/spots/forecasts/?spotId='+ beaches[0] +'&days=3&intervalHours=12&maxHeights=false');
moveMan();

wrightsville.addEventListener('click', function() {
  buildURL(0)
})
carolina.addEventListener('click', function() {
  buildURL(1)
})
surfCity.addEventListener('click', function() {
  buildURL(2)

})




function buildURL(a){
    apiURL = 'https://services.surfline.com/kbyg/spots/forecasts/?spotId='+ beaches[a] +'&days=3&intervalHours=12&maxHeights=false';
    surfCall(apiURL);
    moveMan();
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
    var s = new Date(responseAPI.data.forecasts[i].timestamp *1000); 
    timeboxesHigh[i] = responseAPI.data.forecasts[i].surf.max
    timeboxesLow[i] = responseAPI.data.forecasts[i].surf.min
  }
  updateWaveHeights();

}


function updateWaveHeights() {
  for (i=0; i < 8 ; i++) {
    if (mediaQuery.matches) {
      waveHeightsList.children[0].children[i].style.height = timeboxesHigh[i] * 11.25 + 'px'
      waveHeightsList.children[1].children[i].style.height = timeboxesLow[i] * 11.25 + 'px'
     } else {
       waveHeightsList.children[0].children[i].style.height = timeboxesHigh[i] * 30 + 'px'
       waveHeightsList.children[1].children[i].style.height = timeboxesLow[i] * 30 + 'px'
     }   
  }
}

function moveMan() {
  if (mediaQuery.matches) {
    var spaceToMove = currentTime * 12.5
    surfer[0].style.right = (280 - spaceToMove) + 'px'
  } else {
    var spaceToMove = currentTime * 33
    surfer[0].style.right = (750 - spaceToMove) + 'px'
  }
  
  console.log(surfer, spaceToMove)
}

$(document).ready(function(){
   
  setInterval(function(){
      $("#date").text(moment().format('MMMM Do YYYY, h:mm a'));
  }, 1000);
})


function handleViewChange(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    updateWaveHeights();
    moveMan();
  }
   else {
    updateWaveHeights();
    moveMan();
  }
}

 
// Register event listener
mediaQuery.addListener(handleViewChange)