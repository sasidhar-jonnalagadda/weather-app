const apiKey = "f4a140b657703010ff86c1b326004c80";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/sun.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/rain.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "https://img.icons8.com/clouds/100/000000/fog-day.png";
  }

  document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

const locationBtn = document.getElementById("location-btn");

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      console.log(`Lat: ${lat}, Lon: ${lon}`);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      var data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/sun.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/rain.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/fog-day.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

checkWeather("Hyderabad");