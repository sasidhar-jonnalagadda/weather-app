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
    
    if (weatherMain == "Clouds") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/clouds.png";
    } else if (weatherMain == "Clear") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/sun.png";
    } else if (weatherMain == "Rain") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/rain.png";
    } else if (weatherMain == "Drizzle") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/rain.png";
    } else if (weatherMain == "Mist") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/fog-day.png";
    } else if (weatherMain == "Snow") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/snow.png";
    }

    weatherBlock.style.display = "block";
    errorBlock.style.display = "none";
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
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
            fetchWeather(url);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

fetchWeather(apiUrl + "Hyderabad" + `&appid=${apiKey}`);