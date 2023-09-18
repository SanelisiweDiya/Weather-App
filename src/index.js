const currentDayTimeElement = document.getElementById("current-day-time");
const temperatureElement = document.getElementById("temperature");
const celsiusLink = document.getElementById("celsius-link");
const fahrenheitLink = document.getElementById("fahrenheit-link");
const currentDate = new Date();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayOfWeek = daysOfWeek[currentDate.getDay()];
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const amOrPm = hours >= 12 ? "pm" : "am";
const hours12 = hours % 12 || 12;
const formattedTime = `${hours12}:${
  minutes < 10 ? "0" + minutes : minutes
}${amOrPm}`;
currentDayTimeElement.textContent = `Current Forecast: ${dayOfWeek} ${formattedTime}`;

const searchForm = document.querySelector(".search-form");
const cityInput = document.getElementById("city-input");
const searchedCityElement = document.getElementById("searched-city");
const cityHeading = document.getElementById("city-heading");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchedCity = cityInput.value;
  showPosition(cityInput.value);
  cityInput.value = "";
  cityHeading.textContent = searchedCity;
});
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 35;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}
function displayWeather(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}
function showPosition(city) {
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function pressSubmit() {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showPosition(city);
}

function searchLocation(position) {
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

showPosition("Margate");
