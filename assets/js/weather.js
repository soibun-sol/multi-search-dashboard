// The following link is an example of the Weather API call for Calgary
// https://api.openweathermap.org/data/2.5/weather?q=calgary&appid=9d5291fe7526d88330f35a346c100d42&units=metric
//
//
// Weather API: https://openweathermap.org/api - 60 requests per minute max
const apiKey = "161e5b665cfcc054c25965cc7b8781e1";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// Get the elements from the DOM
const inputCity = document.getElementById("city");
const searchButton = document.getElementById("city-search-btn");
const weatherIcon = document.getElementById("city-weather-icon");

function saveCity(city) {
  // Save the city to local storage
  localStorage.setItem("lastCity", city);
}

function getLastCity() {
  // Grab local storage for the last searched city
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    getWeather(lastCity);
  }
}

function saveWeatherData(data) {
  // Save the weather data to local storage
  localStorage.setItem("weatherData", JSON.stringify(data));
  console.log("Weather Data Saved: ", data);
}

// add listener to search button to activate getWeather function and API call
searchButton.addEventListener("click", () => {
  const city = inputCity.value;
  getWeather(city);
});

async function getWeather(city) {
  // fetch the weather data from the API -> await the response -> convert the response to JSON
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log("Get weather Data: ", data);

  // save the city to local storage
  saveCity(city);
  console.log("City Saved: ", city);
  // save the weather data to local storage
  saveWeatherData(data);
  console.log("Weather Data Saved: ", data);

  
  // attach the data to the proper DOM elements
  document.getElementById("city-name").innerHTML = data.name;

  document.getElementById("city-temp").innerHTML = `${Math.round(
    data.main.temp
  )}°C`;

  document.getElementById("city-humidity").innerHTML = `${data.main.humidity}%`;

  document.getElementById("city-wind").innerHTML = `${data.wind.speed} km/h`;

  // if block - could be a switch statement
  // set the weather icon based on the weather data
  if (data.weather[0].main === "Clouds") {
    document.getElementById("city-weather-description").innerHTML = "Cloudy";
    weatherIcon.src =
      "./assets/images/svg/cloud-cloudy-element-forecast-rain-svgrepo-com.svg";
  } else if (data.weather[0].main === "Clear") {
    document.getElementById("city-weather-description").innerHTML = "Clear";
    weatherIcon.src =
      "./assets/images/svg/element-forecast-summer-sun-sunny-svgrepo-com.svg";
  } else if (data.weather[0].main === "Rain") {
    document.getElementById("city-weather-description").innerHTML = "Rainy";
    weatherIcon.src =
      "./assets/images/svg/cloud-element-forecast-rain-rainy-svgrepo-com.svg";
  } else if (data.weather[0].main === "Drizzle") {
    document.getElementById("city-weather-description").innerHTML = "Drizzle";
    weatherIcon.src =
      "./assets/images/svg/cloud-element-forecast-rain-rainy-svgrepo-com.svg";
  } else if (data.weather[0].main === "Mist") {
    document.getElementById("city-weather-description").innerHTML = "Misty";
    weatherIcon.src =
      "./assets/images/svg/forecast-cloud-fog-foggy-weather-svgrepo-com.svg";
  } else if (data.weather[0].main === "Thunderstorm") {
    document.getElementById("city-weather-description").innerHTML =
      "Thunderstorm";
    weatherIcon.src =
      "./assets/images/svg/element-forecast-storm-stormy-thunder-svgrepo-com.svg";
  } else if (data.weather[0].main === "Snow") {
    document.getElementById("city-weather-description").innerHTML = "Snow";
    weatherIcon.src =
      "./assets/images/svg/season-weather-snow-cold-christmas-svgrepo-com.svg";
  }
}

getLastCity();
