const apiKey = "f4a140b657703010ff86c1b326004c80";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const locationBtn = document.getElementById("location-btn");
const unitToggle = document.getElementById("unit-toggle");
const weatherBlock = document.querySelector(".weather");
const errorBlock = document.querySelector(".error");
const loader = document.querySelector(".loader");
const forecastBlock = document.querySelector(".forecast");

let isCelsius = true;
let currentWeatherData = null;
let currentForecastData = null;

async function fetchWeather(cityUrl) {
    try {
        loader.style.display = "block";
        weatherBlock.style.display = "none";
        errorBlock.style.display = "none";
        forecastBlock.innerHTML = "";

        const response = await fetch(cityUrl);
        loader.style.display = "none"; 

        if (response.status == 404) {
            errorBlock.style.display = "block";
        } else {
            const data = await response.json();
            currentWeatherData = data;
            updateWeatherUI(currentWeatherData);
            
            fetchForecast(data.name);
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        loader.style.display = "none";
    }
}

async function fetchForecast(city) {
    try {
        const url = `${forecastUrl}${city}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        currentForecastData = data;
        updateForecastUI(currentForecastData);
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
}

function updateWeatherUI(data) {
    let temp = data.main.temp;
    let feelsLike = data.main.feels_like;
    let unitSymbol = "°c";

    if (!isCelsius) {
        temp = (temp * 9/5) + 32;
        feelsLike = (feelsLike * 9/5) + 32;
        unitSymbol = "°f";
        unitToggle.innerText = "°C"; 
    } else {
        unitToggle.innerText = "°F";
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(temp) + unitSymbol;
    document.querySelector(".feels-like").innerHTML = `Feels like ${Math.round(feelsLike)}${unitSymbol}`;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const timezoneOffset = data.timezone; 
    const now = new Date(); 
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000); 
    const targetTime = new Date(utc + (1000 * timezoneOffset)); 
    
    const options = { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
    document.querySelector(".date-time").innerText = targetTime.toLocaleTimeString('en-US', options);

    const weatherMain = data.weather[0].main;
    const card = document.querySelector(".card");
    const isDay = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;

    if (weatherMain == "Clear") {
        weatherIcon.src = isDay ? "https://img.icons8.com/clouds/100/000000/sun.png" : "https://img.icons8.com/clouds/100/000000/moon.png";
        card.style.background = isDay ? "linear-gradient(135deg, #fceabb, #f8b500)" : "linear-gradient(135deg, #000428, #004e92)";
    } else if (weatherMain == "Clouds") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/clouds.png";
        card.style.background = isDay ? "linear-gradient(135deg, #757F9A, #D7DDE8)" : "linear-gradient(135deg, #232526, #414345)";
    } else if (weatherMain == "Rain" || weatherMain == "Drizzle") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/rain.png";
        card.style.background = "linear-gradient(135deg, #2c3e50, #2980b9)";
    } else if (weatherMain == "Snow") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/snow.png";
        card.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)";
    } else if (weatherMain == "Thunderstorm") {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/storm.png";
        card.style.background = "linear-gradient(135deg, #373B44, #4286f4)";
    } else {
        weatherIcon.src = "https://img.icons8.com/clouds/100/000000/fog-day.png";
        card.style.background = "linear-gradient(135deg, #3E5151, #DECBA4)";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

function updateForecastUI(data) {
    forecastBlock.innerHTML = ""; 
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyData.forEach(day => {
        let temp = day.main.temp;
        let unitSymbol = "°c";

        if (!isCelsius) {
            temp = (temp * 9/5) + 32;
            unitSymbol = "°f";
        }

        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        const dayCard = `
            <div class="day-card">
                <p>${dayName}</p>
                <img src="${iconUrl}" alt="weather icon">
                <p>${Math.round(temp)}${unitSymbol}</p>
            </div>
        `;
        forecastBlock.innerHTML += dayCard;
    });
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") fetchWeather(apiUrl + city + `&appid=${apiKey}`);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city !== "") fetchWeather(apiUrl + city + `&appid=${apiKey}`);
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
                alert("Unable to retrieve location.");
            }
        );
    } else {
        alert("Geolocation not supported.");
    }
});

unitToggle.addEventListener("click", () => {
    if (currentWeatherData) {
        isCelsius = !isCelsius;
        updateWeatherUI(currentWeatherData);
        if (currentForecastData) {
            updateForecastUI(currentForecastData);
        }
    }
});

fetchWeather(apiUrl + "Hyderabad" + `&appid=${apiKey}`);