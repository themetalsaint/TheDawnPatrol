
//add NC to userInput
var userInput = 'Wrightsville Beach' //'get the input from html form'
var beachName = userInput + ' NC' //userInput + ' NC'

//Using positionStackApi, fetch data by beach-name, and get latitude, and longitude of the beach 
function getData(){
    var psApiKey = '8e190ed679ba752690fd2008444f7cd2'
    var positionStackApi = `http://api.positionstack.com/v1/forward?access_key=${psApiKey}&query=${beachName}&country=US`
    fetch(positionStackApi)
    .then(function(response){
        response.json()
        .then(function(beach){
            var lat = beach.data[0].latitude
            var long = beach.data[0].longitude
            getForecastWeather(lat,long)
        })
    })   

}


//By using OpenWeatherApi, accept lat,long to retrieve current weather information
function getForecastWeather(lat,long){
    var forecastKey = 'a2b4c3401daabb98bf05eae4890ac57c'
    var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=hourly,minutely,alerts&appid=${forecastKey}`
    fetch(forecastWeatherUrl)
        .then(function(response){
            response.json().then(function(weather){
            console.log(weather)
            displayWeather(weather)
        })
    })
}

//display the current weather info to the page
function displayWeather(weatherData){
    var weatherCardEl = $('.weather-forecast')

    var beachEl = $('<h3>')
    beachEl.addClass('text-style beach-name')
    beachEl.text(userInput)

    var currentEl = $('<h3>')
    currentEl.addClass('text-style')
    currentEl.text('Now')

    var iconEl = $('<img>')
    iconEl.attr('src',`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`)
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

//invoke function
getData()