var tideApiUrl = 'https://services.surfline.com/kbyg/spots/forecasts/?spotId=5842041f4e65fad6a7708a65&days=3&intervalHours=12&maxHeights=false'
fetch(tideApiUrl)
        .then(function(response){
            response.json().then(function(tideData){
            console.log(tideData)
            
        })
    })

    $(document).ready(function(){
   
        setInterval(function(){
            $("#date").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
        }, 1000);
    })