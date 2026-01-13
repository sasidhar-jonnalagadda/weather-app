const apiKey = "f4a140b657703010ff86c1b326004c80";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const locationBtn = document.getElementById("location-btn");
const weatherBlock = document.querySelector(".weather");
const errorBlock = document.querySelector(".error");
const loader = document.querySelector(".loader");

async function fetchWeather(url) {
    try {
        loader.style.display = "block";
        weatherBlock.style.display = "none";
        errorBlock.style.display = "none";

        const response = await fetch(url);
        
        loader.style.display = "none"; 

        if (response.status == 404) {
            errorBlock.style.display = "block";
        } else {
            const data = await response.json();
            updateWeatherUI(data);
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        loader.style.display = "none";
    }
}

function updateWeatherUI(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".feels-like").innerHTML = `Feels like ${Math.round(data.main.feels_like)}°c`;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  const weatherMain = data.weather[0].main;
  const card = document.querySelector(".card");
  
  const isDay = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;

  if (weatherMain == "Clouds") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/clouds.png";
    card.style.background = isDay 
        ? "linear-gradient(135deg, #757F9A, #D7DDE8)" 
        : "linear-gradient(135deg, #232526, #414345)";
  } 
  else if (weatherMain == "Clear") {
    if (isDay) {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/sun.png";
        card.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
    } else {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/moon.png";
        card.style.background = "linear-gradient(135deg, #000428, #004e92)";
    }
  } 
  else if (weatherMain == "Rain") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/rain.png";
    card.style.background = "linear-gradient(135deg, #2c3e50, #2980b9)";
  } 
  else if (weatherMain == "Drizzle") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/rain.png";
    card.style.background = "linear-gradient(135deg, #4c669f, #3b5998)";
  } 
  else if (["Mist", "Haze", "Fog", "Smoke"].includes(weatherMain)) {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/fog-day.png";
    card.style.background = "linear-gradient(135deg, #3E5151, #DECBA4)";
  } 
  else if (weatherMain == "Snow") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/snow.png";
    card.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)";
  } 
  else if (weatherMain == "Thunderstorm") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/storm.png";
    card.style.background = "linear-gradient(135deg, #373B44, #4286f4)";
  } 
  else {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/clouds.png";
    card.style.background = "linear-gradient(135deg, #00feba, #5b548a)";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        fetchWeather(apiUrl + city + `&appid=${apiKey}`);
    }
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city !== "") {
            fetchWeather(apiUrl + city + `&appid=${apiKey}`);
        }
    }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
        fetchWeather(url);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location. Please check your browser settings.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

fetchWeather(apiUrl + "Hyderabad" + `&appid=${apiKey}`);