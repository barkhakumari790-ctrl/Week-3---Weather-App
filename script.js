
const API_KEY = "YOUR_API_KEY_HERE";

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const message = document.getElementById("message");
const result = document.getElementById("weather-result");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        message.textContent = "Please enter a city name.";
        return;
    }

    if (API_KEY === "YOUR_API_KEY_HERE") {
        message.textContent = "Please add your OpenWeatherMap API key.";
        return;
    }

    message.textContent = "Loading weather...";
    result.classList.add("hidden");

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to get weather.");
        }

        document.getElementById("city-name").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("condition").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("feels-like").textContent =
            `${Math.round(data.main.feels_like)}°C`;

        const icon = document.getElementById("weather-icon");
        icon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        icon.alt = data.weather[0].description;

        result.classList.remove("hidden");
        message.textContent = "";

    } catch (error) {
        message.textContent =
            error.message === "city not found"
                ? "City not found. Please check the spelling."
                : `Error: ${error.message}`;
    }
});
