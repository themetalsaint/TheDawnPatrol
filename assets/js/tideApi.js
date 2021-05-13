
var beachId = ['5842041f4e65fad6a7708a65', '5842041f4e65fad6a7708a58', '5842041f4e65fad6a7708a49']
var beachN = ['Wrightsville Beach', 'Carolina Beach', 'Surf City Pier']

var defaultBeach = '5842041f4e65fad6a7708a65'
var defaultBeachName = 'Wrightsville Beach'

getItem()
callTideApi(defaultBeach, defaultBeachName)

$('#wrightsville').on('click', function(event){
    event.preventDefault()
    callTideApi(beachId[0], beachN[0])
    defaultBeach = beachId[0]
    defaultBeachName = beachN[0]
    setItem(defaultBeach, defaultBeachName)
    
})
$('#carolina').on('click', function(event){
    
    event.preventDefault()
    callTideApi(beachId[1], beachN[1])
    defaultBeach = beachId[1]
    defaultBeachName = beachN[1]
    setItem(defaultBeach, defaultBeachName)
    
})
$('#surfcity').on('click', function(event){
    event.preventDefault()
    callTideApi(beachId[2], beachN[2])
    defaultBeach = beachId[2]
    defaultBeachName = beachN[2]
    setItem(defaultBeach, defaultBeachName)
})


function callTideApi(bId, beachN){
    
    $('.table').text('')
    var tideApiUrl = `https://services.surfline.com/kbyg/spots/forecasts/?spotId=${bId}&days=3&intervalHours=12&maxHeights=false`
    fetch(tideApiUrl)
            .then(function(response){
                response.json().then(function(tideData){
                // console.log(tideData)
                $('.beach').text(beachN)
                getTideInfo(tideData)
                
            })
        })
}
function setItem(bid, bname){
    localStorage.setItem('beachId', bid)
    localStorage.setItem('beachName', bname) 

}
function getItem(){
    var storedId = localStorage.getItem('beachId')
    var storedName = localStorage.getItem('beachName')
    if(storedId == null && storedName == null){
        storedId = '5842041f4e65fad6a7708a65'
        storedName = 'Wrightsville Beach'
    }
    defaultBeach = storedId
    defaultBeachName = storedName
    // console.log(defaultBeachName)
}

function getTideInfo(tideData){

    var dailyTimestamp = []
    var timestampData = []
    for (var i = 0; i < tideData.data.tides.length; i++){
        var tideInfo = tideData.data.tides[i]
        timestampData.push(tideInfo.timestamp)
        
        //get daily timestamp
        var day = moment.unix(tideInfo.timestamp).format('MM/DD')
        if(dailyTimestamp.indexOf(day) === -1){
            dailyTimestamp.push(day)
            dailyTimestamp.push(tideInfo)
        }     
    }
    
    var dailyTideArray = []
    filterUnixFormat(dailyTimestamp, dailyTideArray)

    //find index for each day
    var day1 = (element) => element === dailyTideArray[1].timestamp;
    var day1Index = timestampData.findIndex(day1)
    var day2 = (element) => element === dailyTideArray[2].timestamp;
    var day2Index = timestampData.findIndex(day2)
    var day3 = (element) => element === dailyTideArray[3].timestamp;
    var day3Index = timestampData.findIndex(day3)
    var day4 = (element) => element === dailyTideArray[4].timestamp;
    var day4Index = timestampData.findIndex(day4)
    
    var table = ['.today-table', '.day2-table', '.day3-table']
    var h3 = ['.today', '.day2', '.day3']
    
    getHourlyTideData(tideData, day1Index, day2Index, table[0], h3[0]) 
    getHourlyTideData(tideData, day2Index, day3Index, table[1], h3[1])
    getHourlyTideData(tideData, day3Index, day4Index, table[2], h3[2])
   
}//end getTideInfo()

function filterUnixFormat(stamp,array){
    
    for(var i = 1; i < stamp.length; i += 2){
        array.push(stamp[i])
    }
    

}//end filterUnixFormat()

function getHourlyTideData(tideData, startDayIndex, endDayIndex, table ,h3){
   
    var tideInfo = tideData.data.tides
    var hourlyTimeStamp = []
    for (var i = startDayIndex; i < endDayIndex; i++){
         //get hourly data of the day
        var hour = moment.unix(tideInfo[i].timestamp).format('h A')
        if( hourlyTimeStamp.indexOf(hour) === -1){
            hourlyTimeStamp.push(hour)
            hourlyTimeStamp.push(tideData.data.tides[i])
        }
    }

    var hourlyTideArray = []
    
    filterUnixFormat(hourlyTimeStamp, hourlyTideArray)    
    // console.log(hourlyTideArray)
    
    appendTideInfo(hourlyTideArray, table, h3)
   

}//end getHourlyTideData()

function appendTideInfo(hourlyTideInfo, table ,h3){

//append type and height header 
    var thType = $('<th>').text('Type')
    var thHeight = $('<th>').text('Height')
    var trHeader = $('<tr>').append('<th>', thType, thHeight)
    $(table).append(trHeader)

    var currentTime = moment().format('H')
    for(var i = 6; i < 19; i++){ 
        if(table == '.today-table'){
//append data starting from current time; only to today-table
            for(var i = currentTime; i < 24; i++){
                var hourly = (moment.unix(hourlyTideInfo[i].timestamp).format('h a'))
                var type = hourlyTideInfo[i].type
                var height = hourlyTideInfo[i].height

                var thHourly = $('<th>').text(hourly)
                var tdType = $('<td>').text(type)
                var tdHeight = $('<td>').text(`${height} ft`)

                var currentHour = (moment.unix(hourlyTideInfo[i].timestamp).format('MM/DD h a'))
                if(currentHour == moment().format('MM/DD h a')){
                    thHourly.text('Now')
                }
                var trData = $('<tr>').append(thHourly, tdType, tdHeight)
                
                
                $(table).append(trData)
               
                $(h3).text(`Today (${moment().format('dddd MM/DD')})`)        
            }
            

 //append data from 6am to 6pm; to forecast-table          
        }
        else{
            var hourly = (moment.unix(hourlyTideInfo[i].timestamp).format('h a'))
            var type = hourlyTideInfo[i].type
            var height = hourlyTideInfo[i].height
         
            var thHourly = $('<th>').text(hourly)
            var tdType = $('<td>').text(type)
            var tdHeight = $('<td>').text(`${height} ft`)

            var tr = $('<tr>').append(thHourly, tdType, tdHeight)
            $(table).append(tr)    

            var date = (moment.unix(hourlyTideInfo[i].timestamp).format('dddd MM/DD'))
            $(h3).text(date)
        }

        
    }
   

} //end appendTideInfo()



//slides starts here
var tideSlides = $('.tide-forecast')
tideSlides[0].style.display = 'block'



var slideIndex = 1
$('.next-btn').on('click', function(event){
    event.preventDefault()
    showSlides(slideIndex++)

})
$('.prev-btn').on('click', function(event){
    event.preventDefault()
    showSlides(slideIndex--)
    

})

function showSlides(n){
    if( slideIndex > tideSlides.length){slideIndex = 1}
    if( slideIndex < 1 ){slideIndex = tideSlides.length}
    for(var i = 0; i< tideSlides.length;i++){
        tideSlides[i].style.display = 'none'
    }
    tideSlides[slideIndex -1].style.display = 'block'
}
//slides ends here
$("#date").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
 
