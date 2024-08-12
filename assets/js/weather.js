// The following link is an example of the Weather API call for Calgary
// https://api.openweathermap.org/data/2.5/weather?q=calgary&appid=9d5291fe7526d88330f35a346c100d42&units=metric
//

// This is the weather js file that controls the weather api calls.
// A first time visitor is greeted with the defauly sky image
// Local storage is checked for the last city searched if there is no local lastCity value then
// the geolocation API attempts to get the user's current location and save it to local storage
// The weather API is called using the geolocation data
// The weather data is saved to local storage
// The weather data is displayed on the page
// The user can search for a new city and the weather data is displayed on the page
// When they do, the weather data is saved to local storage and displayed on the page for the new city
// When the user returns to the page, the last city searched is displayed on the page

// Weather API: https://openweathermap.org/api - 60 requests per minute max

// Private API key for OpenWeatherMap
const apiKey = "161e5b665cfcc054c25965cc7b8781e1";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// Get the elements from the DOM
const inputLocationQuery = document.getElementById("city");
const searchButton = document.getElementById("city-search-btn");
const weatherIcon = document.getElementById("city-weather-icon");
const currentDate = document.getElementById("current-date");
const hiddenWeather = document.querySelector(".hidden-weather");
const hiddenWeatherButton = document.getElementById("hidden-weather-button");

// use the geolocation API to attempt to get the user's current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // console.log("Latitude: " + latitude + ", Longitude: " + longitude);

    // save latitude and longitude to local storage
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
    // console.log("Latitude and Longitude Saved: ", latitude, longitude);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}

// function to get the weather data using the geolocation API - if user agrees to share location
async function useGeolocation() {
  // check local storage for the latitude and longitude
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");

  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    getWeather(lastCity);
  } else if (latitude && longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
    const response = await fetch(apiUrl + `&appid=${apiKey}`);

    var data = await response.json();
    // console.log("Geolocated weather Data: ", data);

    // extract the city name, state code, and country code from the weather data
    const cityName = data.name;

    saveCity(cityName);
    // console.log("Geolocated City Saved: ", cityName);

    // save the weather data to local storage
    saveWeatherData(data);
    // console.log("Geolocated Weather Data Saved: ", data);

    // call the getWeather function to display the weather data
    getWeather(cityName);
  }
}

function saveCity(city) {
  // Save the city to local storage
  localStorage.setItem("lastCity", city);
}

function saveWeatherData(data) {
  // Save the weather data to local storage
  localStorage.setItem("weatherData", JSON.stringify(data));
  // console.log("Weather Data Saved: ", data);
}

// function to get the date and format it
function formatCurrentDate() {
  const date = new Date(); // Get the current date and time

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // destructure the date object to get at the values we want
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  // Format the hours to 12-hour format - ampm is based on hours value
  const formattedHours = hours % 12 || 12;
  const ampm = hours >= 12 ? "pm" : "am";
  // Format the minutes to have a leading zero if less than 10
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const numberSuffix = (n) => {
    if (n > 3 && n < 21) return "th"; // 4th-20th
    // is the last digit of the number 1, 2, or 3?
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${dayOfWeek} ${month} ${day}${numberSuffix(
    day
  )} ${year} - ${formattedHours}:${formattedMinutes}${ampm} MST`;
}

// add listener to search button to activate getWeather function and API call
searchButton.addEventListener("click", () => {
  const city = inputLocationQuery.value;
  getWeather(city);
});

hiddenWeatherButton.addEventListener("click", () => {
  if (hiddenWeather.style.display === "none") {
    hiddenWeather.setAttribute("style", "display: flex");
  } else {
    hiddenWeather.setAttribute("style", "display: none");
  }
});

async function getWeather(city) {
  // fetch the weather data from the API -> await the response -> convert the response to JSON
  // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  // console.log("City search weather Data: ", data);

  // save the city to local storage
  saveCity(city);
  // console.log("City Saved: ", city);
  // save the weather data to local storage
  saveWeatherData(data);
  // console.log("Weather Data Saved: ", data);

  // attach the data to the proper DOM elements
  currentDate.innerHTML = formatCurrentDate();
  document.getElementById("city-name").innerHTML = data.name;

  document.getElementById("city-temp").innerHTML = `${Math.round(
    data.main.temp
  )}°C`;

  document.getElementById("city-humidity").innerHTML = `${data.main.humidity}%`;

  document.getElementById("city-wind").innerHTML = `${data.wind.speed} km/h`;

  document.getElementById(
    "city-temp-feel"
  ).innerHTML = `${data.main.feels_like}°C`;

  document.getElementById(
    "city-temp-low"
  ).innerHTML = `${data.main.temp_min}°C`;

  document.getElementById(
    "city-temp-high"
  ).innerHTML = `${data.main.temp_max}°C`;

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

useGeolocation();
