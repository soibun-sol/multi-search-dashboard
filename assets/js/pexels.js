// private API key for Pexels - 20,000 requests per month max
const pexelsApiKey = "52YGXaVMgHkYq4IrAOHTvkECCHfOPSVZv9KvzJCcNcSZhLSW8W9vicIx";

const backgroundImage = document.getElementById("hero-weather-img");
const citySearchButton = document.getElementById("city-search-btn");
const citySearchInput = document.getElementById("city");

// Add listener to call function when CHANGE BACKGROUND button is clicked
const changeBackgroundButton = document.getElementById("change-background-btn");

// to update the modal image when the page loads we will grab it now
const pexelsModalImg = document.getElementById("pexels-modal-image");

// function to retrive weather data from local storage - called in fetchData function
function retrieveWeatherData() {
  // Retrieve the weather data from local storage
  const weatherData = localStorage.getItem("weatherData");
  if (weatherData) {
    return JSON.parse(weatherData);
  }
}

// Fetch data from Pexels API
// query will be generated from the weather data api when it calls for weather data
// temporary query can be manually set for testing
async function fetchData(weatherDescription = "") {
  // first fetch the weather data from local storage
  const weatherData = retrieveWeatherData() || {};
  console.log("Weather Data: ", weatherData);
  let descriptionQuery = weatherData.weather[0].description;
  // check if the function is called with a weather description
  // if not, use the weather data from the local storage
  if (weatherDescription !== "") {
    descriptionQuery = weatherDescription;
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=landscape+photograph+of+sky+${descriptionQuery}&per_page=50`,
      {
        // authentication headers for Pexels API
        headers: {
          Authorization: pexelsApiKey,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    // If there are photos in the response, set the hero image to the first photo
    if (data.photos && data.photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.photos.length);
      const weatherPhotoLink = data.photos[randomIndex].src.original;
      const photographerName = data.photos[randomIndex].photographer;
      console.log(weatherPhotoLink);
      document.getElementById("hero-weather-img").src = weatherPhotoLink;
      document.getElementById("photographer-name").textContent =
        photographerName;
      pexelsModalImg.src = weatherPhotoLink;
    }
  } catch (error) {
    // Log any errors to the console
    console.error("Error fetching Pexels data:", error);
  }
}
// pexels Api function
fetchData();

// Add listener to call function when search button is clicked
citySearchButton.addEventListener("click", () => {
  const description = "Beautiful Sunset";
  fetchData(description);
});
// Handle the case where the user presses enter instead of clicking the button
citySearchButton.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    const description = e.target.value;
    fetchData(description);
  }
});

// Add listener to change background button
changeBackgroundButton.addEventListener("click", () => {
  fetchData();
});
