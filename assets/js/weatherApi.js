
var beach = {
    name: ['Wrightsville Beach', 'Surf City Pier', 'Carolina Beach'],
    lat:['34.213810', '34.42514', '34.035172'],
    lon:['-77.805527', '-77.54562', '-77.893600']
}
//default diplay
var beachName = beach.name[0];
getCoordinates(beachName)

//click event for selecting beach
$('#wrightsville').on('click', function(event){
    event.preventDefault()
    beachName = beach.name[0]
    getCoordinates(beachName)
})
$('#carolina').on('click', function(event){
    event.preventDefault()
    beachName = beach.name[2]
    getCoordinates(beachName)
})
$('#surfcity').on('click', function(event){
    event.preventDefault()
    beachName = beach.name[1]
    getCoordinates(beachName)
})


function getCoordinates(beachInput){
    $('.weather-forecast').text('')
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
    var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely,alerts&appid=${forecastKey}`
    fetch(forecastWeatherUrl)
        .then(function(response){
            response.json().then(function(weather){
            // console.log(weather)
            displayWeather(weather)
        })
    })
}

//display the current weather info to the page
function displayWeather(weatherData){
    
    var weatherCardEl = $('.weather-forecast')
    var beachEl = $('<h3>')
    beachEl.addClass('text-style beach-name')
    beachEl.text(beachName)

    var currentEl = $('<h3>')
    currentEl.addClass('text-style')
    currentEl.text('Now')

    var iconEl = $('<img>')
    iconEl.attr('src',`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`)
    iconEl.addClass('current-img text-style')

    var descriptionEl = $('<p>')
    descriptionEl.addClass('text-style capital')
    descriptionEl.text(weatherData.current.weather[0].description)
    
    var tempEl = $('<p>')
    tempEl.addClass('text-style')
    tempEl.text(`Temp: ${weatherData.current.temp} \xB0F`)

    var windEl = $('<p>')
    windEl.addClass('text-style')
    windEl.text(`Wind Speed: ${weatherData.current.wind_speed} MPH`)

    var humidityEl = $('<p>')
    humidityEl.addClass('text-style')
    humidityEl.text(`Humidity: ${weatherData.current.humidity}%`)

    var uvEl = $('<p>')
    uvEl.addClass('text-style')
    uvEl.text(`UV Index: (${weatherData.current.uvi})`)

    weatherCardEl.append( beachEl, iconEl, currentEl, descriptionEl, tempEl, windEl, humidityEl, uvEl)

}
