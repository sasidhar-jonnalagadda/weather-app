const apiKey = "f4a140b657703010ff86c1b326004c80";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);

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
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});