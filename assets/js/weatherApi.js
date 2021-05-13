
var beach = {
    name: ['Wrightsville Beach', 'Surf City Pier', 'Carolina Beach'],
    lat:['34.213810', '34.42514', '34.035172'],
    lon:['-77.805527', '-77.54562', '-77.893600']
}
//default diplay

var beachName = beach.name[0];
getItem()
getCoordinates(beachName)

//click event for selecting beach
$('#wrightsville').on('click', function(event){
    event.preventDefault()
    beachName = beach.name[0]
    getCoordinates(beachName)
    $('.body').css('background-color','rgb(9, 177, 228)')
    
})
$('#carolina').on('click', function(event){
    event.preventDefault()
    beachName = beach.name[2]
    getCoordinates(beachName)
    $('.body').css('background-color','blueviolet')
   
    
    
})
$('#surfcity').on('click', function(event){
    event.preventDefault()
    beachName = beach.name[1]
    getCoordinates(beachName)
    $('.body').css('background-color','rgb(18, 112, 34)')

})

if(beachName === 'Wrightsville Beach'){
    $('.body').css('background-color','rgb(9, 177, 228)')
    
}
if(beachName === 'Carolina Beach'){
    $('.body').css('background-color','blueviolet')
}
if(beachName === 'Surf City Pier'){
    $('.body').css('background-color','rgb(18, 112, 34)')
}



function getCoordinates(beachInput){
    $('.weather').text('')
    for(var i = 0; i < beach.name.length; i++){
        if(beachInput == beach.name[i]){
            var lat = beach.lat[i]
            var lon = beach.lon[i]
            // console.log(beach.lat[i])
            getForecastWeather(lat,lon)
        }
    }
    

}


//accept lat,long to retrieve current weather information
function getForecastWeather(lat,lon){
    
    var forecastKey = 'a2b4c3401daabb98bf05eae4890ac57c'
    var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=${forecastKey}`
    fetch(forecastWeatherUrl)
        .then(function(response){
            response.json().then(function(weather){
            // console.log(weather)
            getHourlyData(weather)

        })
    })
}

function getItem(){
    var storedName = localStorage.getItem('beachName')
    if (storedName == null){
        storedName = beach.name[0]
    }
    beachName = storedName
    // console.log(storedName)

}
function getHourlyData(weatherData){
   
    var dailyData = weatherData.hourly
    var daily = []
    //find start day index
    for (var i = 0; i < dailyData.length; i++){
        var dayDt = moment.unix(dailyData[i].dt).format('MM/DD')
        if(daily.indexOf(dayDt) === -1){
            daily.push(dayDt)
            daily.push(dailyData[i])
        }
        
    }
    var dailyDt = []
    filterUnixFormat(daily, dailyDt)

    //find index of each staring day
    var currentDay = (element) => element === dailyDt[0];
    var currentDayIndex = dailyData.findIndex(currentDay)
    var nextDay = (element) => element === dailyDt[1];
    var nextDayIndex = dailyData.findIndex(nextDay)
    var lastDay = (element) => element === dailyDt[2];
    var lastDayIndex = dailyData.findIndex(lastDay)
    var endDay = (element) => element === dailyData[(dailyData.length-1)]
    var endDayIndex = dailyData.findIndex(endDay)

    var weatherTable = ['.today-weather', '.day2-weather', '.day3-weather']
    var day = ['.day1-w', '.day2-w', '.day3-w']
    displayWeather(weatherTable[0], day[0], weatherData, currentDayIndex, nextDayIndex)
    displayWeather(weatherTable[1], day[1], weatherData, nextDayIndex, lastDayIndex)
    displayWeather(weatherTable[2], day[2], weatherData, lastDayIndex, endDayIndex)

    // console.log(dailyData)
    // console.log(dailyDt)
    // console.log(currentDayIndex)
    // console.log(nextDayIndex)
    // console.log(lastDayIndex)
    // console.log(dailyData[endDayIndex])
    
}

function filterUnixFormat(rawDataArray, arrayToPush){
    
    for(var i = 1; i < rawDataArray.length; i += 2){
        arrayToPush.push(rawDataArray[i])
    }
    

}//end filterUnixFormat()

 //display the current weather info to the page
function displayWeather(weatherTable, day, weatherData, startIndex, endIndex){
    var hourlyData = weatherData.hourly
    // console.log(hourlyData)
    //append type and height header
    var thTemp = $('<th>').text('Temp')
    var thWind = $('<th>').text('Wind')
    var thHu = $('<th>').text('Humidity')
    var thUv = $('<th>').text('UVI')
    var trHeader = $('<tr>').append('<th>', thTemp, thWind, thHu, thUv)
    $(weatherTable).append(trHeader)

    for(var i = startIndex; i < endIndex; i++){
        var hour = $('<th>').text(moment.unix(hourlyData[i].dt).format('h a'))
        var temp = $('<td>').text(hourlyData[i].temp + '\xB0F')
        var wind = $('<td>').text(hourlyData[i].wind_speed + ' mph')
        var humid = $('<td>').text(hourlyData[i].humidity + '%')
        var uv = $('<td>').text(`(${hourlyData[i].uvi})`)
        if(hour.text() == moment().format('h a')){
            hour.text('Now')
        }
        var trData = $('<tr>').append(hour, temp, wind, humid, uv)

        
        $(weatherTable).append(trData)


        var date = (moment.unix(hourlyData[i].dt).format('dddd MM/DD'))
        if(date == moment().format('dddd MM/DD')){
            date = `Today (${date})`
        }
        $(day).text(date)

    }
   
}


//slide sections
var weatherSlides = $('.weather-forecast')
weatherSlides[0].style.display = 'block'

var slideIndex = 1
$('.n-btn').on('click', function(event){
    event.preventDefault()
    show(slideIndex++)

})
$('.p-btn').on('click', function(event){
    event.preventDefault()
    show(slideIndex--)
    


})

function show(n){
    if( slideIndex > weatherSlides.length){slideIndex = 1}
    if( slideIndex < 1 ){slideIndex = weatherSlides.length}
    for(var i = 0; i< weatherSlides.length;i++){
        weatherSlides[i].style.display = 'none'
    }
    weatherSlides[slideIndex -1].style.display = 'block'
}
