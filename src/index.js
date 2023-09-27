function formatDate(timestamp) {
  let date = newDate(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayweather() {
  let forecastElement = document.querySelector("#weather");
  let days = ["Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
               <div class="forecast-date">${day}</div>
                 <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42" />
                  <div class="forecast-temp">
                  <span class="forecast-temp-max">27°</span>|<span class="forecast-temp-min">22°</span>
              </div>
              </div>
            </div>`;
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "49t2939ab263784af1ebee426o787f30";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
}

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = "Thursday 15:45";
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `"http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png"`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}
function pressSubmit() {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}
function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

function searchCity(city) {
  let apiKey = "49t2939ab263784af1ebee426o787f30";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
let Form = document.querySelector(".search-form");
searchForm.addEventListener("submit", pressSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);
searchCity("Cape Town");
displayweather();
