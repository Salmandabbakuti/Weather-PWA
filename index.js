window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      showWeatherInfo(coords.latitude, coords.longitude);
    });
  } else {
    console.error("Geo location is not supported by this browser.");
  }
};

function showWeatherInfo(lat, long) {
  let response;
  var url = `https://api.darksky.net/forecast/ad096d4a9c924346fc6fd9004f00044d/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
  displayWeather(response);
}

function displayWeather(response) {
  document.getElementById("weather-summary").innerHTML = `${response.currently.summary}`;
  document.getElementById('current-temperature').innerHTML = Math.round((response.currently.temperature - 32) * 0.555) + " °C" + " / " + response.currently.temperature + " °F";
  document.getElementById("weather-summary").innerHTML = response.hourly.summary;
  document.getElementById("current-humidity").innerHTML = `Humidity: ${(response.currently.humidity) * 100}%`;
  document.getElementById("current-pressure").innerHTML = `Pressure: ${response.currently.pressure} mb`;
  document.getElementById("current-uvIndex").innerHTML = `UV Index: ${response.currently.uvIndex}`;
  document.getElementById("current-wind-speed").innerHTML = `Wind: ${Math.round(response.currently.windSpeed * 1.852)} Km/h`;
  document.getElementById("current-wind-bearing").innerHTML = `Direction: ${response.currently.windBearing}°`;
}

function getDateTime() {
  let hours = new Date().getHours();
  const minutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()} ` : new Date().getMinutes();
  const seconds = new Date().getSeconds() < 10 ? `0${new Date().getSeconds()} ` : new Date().getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  // Auto dark mode logic
  if (hours >= 19 || hours <= 5) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  }
  // converting hours into 12 hour format
  hours = hours % 12 < 10 ? `0${hours % 12}` : hours % 12;
  document.getElementById("time").innerHTML = `${hours} : ${minutes} : ${seconds} ${ampm}`;
  document.getElementById("date").innerHTML = new Date().toDateString();
}
setInterval(getDateTime, 1000);
