const userInput = document.querySelector(".city-input");
const container = document.querySelector(".future-readings-container");

const weatherIcon = document.getElementById("weather-icon");
const WeatherDescription = document.querySelector(".weather-description");
const currentTemp = document.getElementById("current-temp");
const currentMinTemp = document.getElementById("min-temp");
const currentMaxTemp = document.getElementById("max-temp");
const windSpeed = document.getElementById("wind-speed");
const precipitation = document.getElementById("precipitation-chance");
const humidity = document.getElementById("relative-humidity");

let typingTimer;
let cityName = "Antarctica";

userInput.addEventListener("input", () => {
  clearTimeout(typingTimer);
  cityName = userInput.value.trim();

  if (!cityName) {
    cityName = "Antarctica";
    userInput.placeholder = "Antarctica";
  }

  typingTimer = setTimeout(() => {
    getWeatherData(cityName);
  }, 800);
});

async function getWeatherData(cityName) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      resetScreenData();
      return;
    }
    const data = await response.json();

    renderTodayWeather(data);
    renderForecast(data);
  } catch (error) {
    console.error("Network Error:", error);
    return;
  }
}

function renderTodayWeather(data) {
  const iconCode = data.list[0].weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.src = iconUrl;

  WeatherDescription.textContent = data.list[0].weather[0].description;

  const targetDate = data.list[0].dt_txt.split(" ")[0];
  const todayIntervals = data.list.filter((item) =>
    item.dt_txt.startsWith(targetDate),
  );
  const { trueMax, trueMin } = getExtremes(todayIntervals);

  currentTemp.textContent = `${Math.round(data.list[0].main.temp)}°C`;
  currentMinTemp.textContent = `${trueMin}°C`;
  currentMaxTemp.textContent = `${trueMax}°C`;
  windSpeed.textContent = `${Math.round(data.list[0].wind.speed)}mph`;
  precipitation.textContent = `${Math.round(data.list[0].pop)}%`;
  humidity.textContent = `${Math.round(data.list[0].main.humidity)}%`;
}

function renderForecast(data) {
  const dailyForecasts = data.list.filter((forecastItem) => {
    const isNoon = forecastItem.dt_txt.includes("12:00:00");

    const todayDate = new Date().toISOString().split("T")[0];
    const isNotToday = !forecastItem.dt_txt.startsWith(todayDate);
    return isNoon && isNotToday;
  });

  container.innerHTML = "";

  dailyForecasts.forEach((day) => {
    const dateObject = new Date(day.dt_txt);
    const dayName = dateObject.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const targetDate = day.dt_txt.split(" ")[0];
    const dayIntervals = data.list.filter((item) =>
      item.dt_txt.startsWith(targetDate),
    );
    const { trueMax, trueMin } = getExtremes(dayIntervals);

    const card = `
      <div class="forecast-card">
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather status" class="reading-icon" />
         <p><span>${trueMax}°C</span> /
          <span>${trueMin}°C</span>
        </p>
        <p>${dayName}</p>
      </div>`;

    container.innerHTML += card;
  });
}

function getExtremes(intervals) {
  const maxTemps = intervals.map((item) => item.main.temp_max);
  const minTemps = intervals.map((item) => item.main.temp_min);

  return {
    trueMax: Math.round(Math.max(...maxTemps)),
    trueMin: Math.round(Math.min(...minTemps)),
  };
}

function resetScreenData() {
  WeatherDescription.textContent = "No data available for this city.";

  currentTemp.textContent = "--°C";
  currentMinTemp.textContent = "--°C";
  currentMaxTemp.textContent = "--°C";
  windSpeed.textContent = "--mph";
  precipitation.textContent = "--%";
  humidity.textContent = "--%";

  container.innerHTML = "";
}

getWeatherData("Antarctica");
