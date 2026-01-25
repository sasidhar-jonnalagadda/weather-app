# 🌦️ Advanced Weather Dashboard

A feature-rich, responsive weather application built with vanilla JavaScript. This dashboard goes beyond basic weather fetching by including time-zone awareness, 5-day forecasts, and dynamic visual themes based on the time of day.

**[🔴 LIVE DEMO](https://github.com/sasidhar-jonnalagadda/weather-app)**

## ✨ Key Features

* **🌍 Real-Time Weather Data:** Fetches current conditions (Temp, Humidity, Wind, "Feels Like") via the OpenWeatherMap API.
* **🔮 5-Day Forecast:** Displays a scrollable outlook for the week ahead using data filtering.
* **🕒 Smart Local Time:** Automatically calculates and displays the current local time for *any* searched city, handling timezone offsets dynamically.
* **🌗 Day/Night Cycle:** The UI adapts visually (changing background gradients and icons) depending on whether it is day or night in the target city.
* **🔄 Unit Conversion:** Toggle between Celsius (°C) and Fahrenheit (°F) instantly without re-fetching data.
* **📍 Geolocation:** Auto-detects your current location to show local weather on startup.
* **📱 Fully Responsive:** Optimized layout for desktop, tablet, and mobile devices.

## 🛠️ Technologies Used

* **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+).
* **API:** [OpenWeatherMap API](https://openweathermap.org/api) (Current Weather + 5-Day Forecast endpoints).
* **Icons:** Icons8 & OpenWeatherMap default icons.

## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/sasidhar-jonnalagadda/weather-app.git](https://github.com/sasidhar-jonnalagadda/weather-app.git)
    ```
2.  **Navigate to the project folder:**
    ```bash
    cd weather-app
    ```
3.  **Open `index.html`:**
    * Simply double-click `index.html` to open it in your browser.
    * *Optional:* Use a Live Server extension in VS Code for a better experience.

## 📂 Project Structure

```text
/weather-app
│
├── index.html      # Main HTML structure
├── styles.css      # Styling, gradients, and responsive design
├── script.js       # API logic, timezone math, and DOM manipulation
└── README.md       # Project documentation 