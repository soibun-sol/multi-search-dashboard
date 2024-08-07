var myModal = new bootstrap.Modal(document.getElementById('weather-image-modal'));

const apiKey = "161e5b665cfcc054c25965cc7b8781e1";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const inputCity = document.getElementById("city");
const searchButton = document.getElementById("city-search-btn");
const weatherIcon = document.getElementById("city-weather-icon");
searchButton.addEventListener("click", () => {
  const city = inputCity.value;
  getWeather(city);
});



async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log("Weather Data: ", data);
  document.getElementById("city-name").innerHTML = data.name;

  document.getElementById("city-temp").innerHTML = `${Math.round(
    data.main.temp
  )}°C`;

  document.getElementById("city-humidity").innerHTML = `${data.main.humidity}%`;

  document.getElementById("city-wind").innerHTML = `${data.wind.speed} km/h`;

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src =
      "./assets/images/svg/cloud-cloudy-element-forecast-rain-svgrepo-com.svg";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src =
      "./assets/images/svg/element-forecast-summer-sun-sunny-svgrepo-com.svg";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src =
      "./assets/images/svg/cloud-element-forecast-rain-rainy-svgrepo-com.svg";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src =
      "./assets/images/svg/cloud-element-forecast-rain-rainy-svgrepo-com.svg";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src =
      "./assets/images/svg/forecast-cloud-fog-foggy-weather-svgrepo-com.svg";
  } else if (data.weather[0].main === "Thunderstorm") {
    weatherIcon.src =
      "./assets/images/svg/element-forecast-storm-stormy-thunder-svgrepo-com.svg";
  }
}




// https://api.openweathermap.org/data/2.5/weather?q=calgary&appid=9d5291fe7526d88330f35a346c100d42&units=metric
