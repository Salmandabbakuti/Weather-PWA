var humidity;
var weatherIcon;
var pressure;
var uvIndex;
var temperature;
var temperatureIcon;
var windBearing;
var windSpeed;
var weatherSummary;

window.onload = function() {
  humidity = document.getElementById("current-humidity");
  weatherIcon = document.getElementById("current-icon");
  pressure = document.getElementById("current-pressure");
  uvIndex = document.getElementById("current-uvIndex");
  temperature = document.getElementById("current-temperature");
  temperatureIcon = document.getElementById("temperature-icon");
  windBearing = document.getElementById("current-wind-bearing");
  windSpeed = document.getElementById("current-wind-speed");
  weatherSummary = document.getElementById("weather-summary");
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  let lat= position.coords.latitude;
  let long= position.coords.longitude;
  showWeather(lat,long);
}
getLocation()
 function showWeather(lat,long) {
    var url = `https://api.darksky.net/forecast/ad096d4a9c924346fc6fd9004f00044d/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    displayWeather(object)   
  }
var object;

 function displayWeather(object) {
    humidity.innerHTML = "Humidity: " +(object.currently.humidity)*100+ "%";
    pressure.innerHTML = "Pressure: " + object.currently.pressure + "mb";
    uvIndex.innerHTML = "UVIndex: " + object.currently.uvIndex;
    temperature.innerHTML =Math.round((object.currently.temperature-32)*0.555)+ " °C" + " / " + object.currently.temperature + " °F";
    windBearing.innerHTML = "Direction: " +object.currently.windBearing+ "°";
    windSpeed.innerHTML = "Wind: " +Math.round(object.currently.windSpeed*1.852)+ " Km/h";
    weatherSummary.innerHTML =object.hourly.summary;
    console.log(object);

 }

function time(){
const clockTime = new Date();
var hours = clockTime.getHours();
var hour = hours;
var minutes = clockTime.getMinutes();
var seconds = clockTime.getSeconds();
if(hours < 10){hours = "0" + hours}
if(minutes < 10){minutes = "0" + minutes}
if(seconds < 10){seconds = "0" + seconds}
if(hour > 12){hours =(Number(hours) - 12)}
if(hour >= 12){
  document.getElementById("type").innerHTML="PM";
}
if(hour < 12){
  document.getElementById("type").innerHTML="AM";
}
if(hour >=6){
document.body.style.backgroundColor="white";
document.body.style.color="black";
    }
if(hour<6){
document.body.style.backgroundColor="black";
document.body.style.color="white";
    }
if(hour >=19){
document.body.style.backgroundColor="black";
document.body.style.color="white";
    }
document.getElementById("hour").innerHTML = hours + ":";
document.getElementById("minute").innerHTML = minutes + ":";
document.getElementById("second").innerHTML = seconds;
document.getElementById("date").innerHTML= clockTime.toDateString();

}
setInterval(time, 1000);
