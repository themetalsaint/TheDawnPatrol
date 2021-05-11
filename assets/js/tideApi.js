

var beachId = ['5842041f4e65fad6a7708a65', '5842041f4e65fad6a7708a58', '5842041f4e65fad6a7708a49']
var beachN = ['Wrightsville Beach', 'Carolina Beach', 'Surf City Pier']
callTideApi(beachId[0], beachN[0])

$('#wrightsville').on('click', function(event){
    
    event.preventDefault()
    callTideApi(beachId[0], beachN[0])
    
})
$('#carolina').on('click', function(event){
    
    event.preventDefault()
    callTideApi(beachId[1], beachN[1])
    
})
$('#surfcity').on('click', function(event){
    event.preventDefault()
    callTideApi(beachId[2], beachN[2])
})
// $('.tide-forecast').text('')

function callTideApi(bId, beachN){
    $('.table').text('')
    var tideApiUrl = `https://services.surfline.com/kbyg/spots/forecasts/?spotId=${bId}&days=3&intervalHours=12&maxHeights=false`
    fetch(tideApiUrl)
            .then(function(response){
                response.json().then(function(tideData){
                console.log(tideData)
                $('.beach').text(beachN)
                getTideInfo(tideData)

            })

        })


}


function getTideInfo(tideData){
    // $('.tide-forecast').text('')
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
    // console.log(moment.unix(1620885600).format('h a MM/DD'))
    var dailyTideArray = []
    filterUnixFormat(dailyTimestamp, dailyTideArray)
    // console.log(dailyTideArray)

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
    // getHourlyTideData(tideData, day4Index, endIndex, table[3], h3[3])
   
}//end getTideInfo()

function filterUnixFormat(stamp,array){
    
    for(var i = 1; i < stamp.length; i += 2){
        array.push(stamp[i])
    }
    // console.log(array)

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

    // console.log(hourlyTimeStamp)
    var hourlyTideArray = []
    
    filterUnixFormat(hourlyTimeStamp, hourlyTideArray)    
    // console.log(hourlyTideArray)
    
    appendTideInfo(hourlyTideArray, table, h3, startDayIndex)
   

}//end getHourlyTideData()

function appendTideInfo(hourlyTideInfo, table ,h3, day){
   
    var currentTime = moment().format('H')
    for(var i = 6; i < 19; i++){
        if(table == '.today-table'){
//append data starting from current time; only to today-table
            for(var i = currentTime; i < 24; i++){
                var hourly = (moment.unix(hourlyTideInfo[i].timestamp).format('h a'))
                var type = hourlyTideInfo[i].type
                var height = hourlyTideInfo[i].height
                var today = $('<h3>')
                today.addClass('text-style')
                var tr = $('<tr>')
                var thHourly = $('<th>')
                var tdType = $('<td>')
                var tdHeight = $('<td>')
            
                thHourly.text(hourly)
                var currentHour = (moment.unix(hourlyTideInfo[i].timestamp).format('MM/DD h a'))
                if(currentHour == moment().format('MM/DD h a')){
                    thHourly.text('Now')
                }
        
                tdType.text(type)
                tdHeight.text(`${height} ft`)
                
                tr.append(thHourly)
                tr.append(tdType)
                tr.append(tdHeight)
                
                $(table).append(tr)
                $(h3).text(`Today (${moment().format('dddd MM/DD')})`)        
            }

 //append data from 6am to 6pm; to forecast-table          
        }
        else{
            var hourly = (moment.unix(hourlyTideInfo[i].timestamp).format('h a'))
            var type = hourlyTideInfo[i].type
            var height = hourlyTideInfo[i].height
            var today = $('<h3>')
            today.addClass('text-style')
            var tr = $('<tr>')
            var thHourly = $('<th>')
            var tdType = $('<td>')
            var tdHeight = $('<td>')
        
            thHourly.text(hourly)
            var currentHour = (moment.unix(hourlyTideInfo[i].timestamp).format('MM/DD h a'))
            if(currentHour == moment().format('MM/DD h a')){
                thHourly.text('Now')
            }
    
            tdType.text(type)
            tdHeight.text(`${height} ft`)
            
            tr.append(thHourly)
            tr.append(tdType)
            tr.append(tdHeight)
            
            $(table).append(tr)    

            var date = (moment.unix(hourlyTideInfo[i].timestamp).format('dddd MM/DD'))
            $(h3).text(date)
        }

        
    }
   

} //end appendTideInfo()


var tideSlides = $('.tide-forecast')
tideSlides[0].style.display = 'block'

var slideIndex = 1
$('.next-btn').on('click', function(event){
    event.preventDefault()
    showSlides(slideIndex += 1)

})
$('.prev-btn').on('click', function(event){
    event.preventDefault()
    showSlides(slideIndex += -1)
    

})

function showSlides(n){
    if( slideIndex > tideSlides.length){slideIndex = 1}
    if( slideIndex < 1 ){slideIndex = tideSlides.length}
    for(var i = 0; i< tideSlides.length;i++){
        tideSlides[i].style.display = 'none'
    }
    tideSlides[slideIndex -1].style.display = 'block'
}




$(document).ready(function(){
   
    setInterval(function(){
        $("#date").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);
})

