const apiKey = "df6f8c879ef366023c79e2b2f58b9a52";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" +
  apiKey +
  "&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main.toLowerCase() === "clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main.toLowerCase() === "clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main.toLowerCase() === "rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main.toLowerCase() === "drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main.toLowerCase() === "mist") {
        weatherIcon.src = "images/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  const cityName = searchBox.value.trim();

  if (cityName) {
    checkWeather(cityName);
  } else {
    alert("Masukkan nama kota!");
  }
});