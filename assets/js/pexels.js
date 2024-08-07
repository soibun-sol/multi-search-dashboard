// private API key for Pexels - 20,000 requests per month max
const pexelsApiKey = "52YGXaVMgHkYq4IrAOHTvkECCHfOPSVZv9KvzJCcNcSZhLSW8W9vicIx";

// Fetch data from Pexels API
// query will be generated from the weather data api when it calls for weather data
// temporary query can be manually set for testing
async function fetchData(query = "Miami") {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
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
      console.log(weatherPhotoLink);
      document.getElementById("hero-weather-img").src = weatherPhotoLink;
    }
  } catch (error) {
    // Log any errors to the console
    console.error("Error fetching Pexels data:", error);
  }
}
// pexels Api function
fetchData();
