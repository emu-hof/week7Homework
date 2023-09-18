let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let currentTime = document.querySelector(".time");
currentTime.innerHTML = `${day} ${now.getHours()}:${now.getMinutes()}`;

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function weatherInfo(response) {
  let h1 = document.querySelector("h1");
  let description = document.querySelector(".description");
  let iconElement = document.querySelector("#icon");
  let temperature = document.querySelector(".temp");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  h1.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let tempC = Math.round(response.data.main.temp);
  temperature.innerHTML = tempC;

  function tempconverterCelsius(event) {
    event.preventDefault();
    temperature.innerHTML = tempC;
    Celsius.classList.add("active");
    fahrenheitTemperature.classList.remove("active");
  }
  function tempconverterFahrenheit(event) {
    event.preventDefault();
    temperature.innerHTML = Math.round((response.data.main.temp * 9) / 5 + 32);
    Celsius.classList.remove("active");
    fahrenheitTemperature.classList.add("active");
  }
  let Celsius = document.querySelector("#tempC");
  Celsius.addEventListener("click", tempconverterCelsius);
  let fahrenheitTemperature = document.querySelector("#tempF");
  fahrenheitTemperature.addEventListener("click", tempconverterFahrenheit);

  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
}
axios
  .get(`${apiUrl}&lat=9.005401&lon=38.763611&appid=${apiKey}&units=metric`)
  .then(weatherInfo);

function searchingCountry(event) {
  event.preventDefault();
  let searching = document.querySelector("#searchForm");
  let city = searching.value;
  axios
    .get(`${apiUrl}&q=${city}&appid=${apiKey}&units=metric`)
    .then(weatherInfo);
}

let searchField = document.querySelector(".search-form");
searchField.addEventListener("submit", searchingCountry);
