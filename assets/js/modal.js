$(document).ready(function() {
    $('.modal').modal();
  });
  
  $('.dropdown-trigger').dropdown();

  var carolina = document.getElementById('carolina')
  var surfCity = document.getElementById('surfcity')
  var wrightsville = document.getElementById('wrightsville')
  var carolinaParking = document.getElementById('carolinaParking')
  var surfCityParking = document.getElementById('surfcityParking')
  var wrightsvilleParking = document.getElementById('wrightsvilleParking')
  var carolinaLaws = document.getElementById('carolinaLaws')
  var surfcityLaws = document.getElementById('surfcityLaws')
  var wrightsvilleLaws = document.getElementById('wrightsvilleLaws')
 
carolina.onclick = function(){
  carolinaParking.classList.remove('hide')
  carolinaLaws.classList.remove('hide')
  wrightsvilleParking.classList.add('hide')
  wrightsvilleLaws.classList.add('hide')
  surfCityParking.classList.add('hide')
  surfcityLaws.classList.add('hide')
}

surfCity.onclick = function(){
  surfCityParking.classList.remove('hide')
  surfcityLaws.classList.remove('hide')
  wrightsvilleParking.classList.add('hide')
  wrightsvilleLaws.classList.add('hide')
  carolinaParking.classList.add('hide')
  carolinaLaws.classList.add('hide')
}

wrightsville.onclick = function(){
  wrightsvilleParking.classList.remove('hide')
  wrightsvilleLaws.classList.remove('hide')
  carolinaParking.classList.add('hide')
  carolinaLaws.classList.add('hide')
  surfCityParking.classList.add('hide')
  surfcityLaws.classList.add('hide')
}




