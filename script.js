const apiKey = "f4a140b657703010ff86c1b326004c80";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const locationBtn = document.getElementById("location-btn");
const weatherBlock = document.querySelector(".weather");
const errorBlock = document.querySelector(".error");

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        
        if (response.status == 404) {
            errorBlock.style.display = "block";
            weatherBlock.style.display = "none";
        } else {
            const data = await response.json();
            updateWeatherUI(data);
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

function updateWeatherUI(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  const weatherMain = data.weather[0].main;
  const card = document.querySelector(".card");

  if (weatherMain == "Clouds") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/clouds.png";
    card.style.background = "linear-gradient(135deg, #757F9A, #D7DDE8)";
  } else if (weatherMain == "Clear") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/sun.png";
    card.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
  } else if (weatherMain == "Rain") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/rain.png";
    card.style.background = "linear-gradient(135deg, #2c3e50, #2980b9)";
  } else if (weatherMain == "Drizzle") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/rain.png";
    card.style.background = "linear-gradient(135deg, #4c669f, #3b5998)";
  } else if (["Mist", "Haze", "Fog", "Smoke"].includes(weatherMain)) {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/fog-day.png";
    card.style.background = "linear-gradient(135deg, #3E5151, #DECBA4)";
} else if (weatherMain == "Snow") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/snow.png";
    card.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)";
  } else {
    card.style.background = "linear-gradient(135deg, #00feba, #5b548a)";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    fetchWeather(apiUrl + searchBox.value + `&appid=${apiKey}`);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchWeather(apiUrl + searchBox.value + `&appid=${apiKey}`);
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