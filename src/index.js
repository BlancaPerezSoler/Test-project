let now = new Date();

function currentDate() {
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dateDay = document.querySelector(".day");
  dateDay.innerHTML = `${day} ${hour}:${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
currentDate();

function changeCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#cityCurrent");
  let inputCity = document.querySelector("#placeholder-info");
  currentCity.innerHTML = inputCity.value;

  searchCity(inputCity.value);
}
function searchCity(city) {
  let apiKey = "bf3b0a962c0f2c5a4bea4daa33ad2c1d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let newCity = document.querySelector("#city-input");
newCity.addEventListener("submit", changeCity);

function showTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#cityCurrent").innerHTML = response.data.name;
}

function currentPosition(position) {
  let apiKey = "bf3b0a962c0f2c5a4bea4daa33ad2c1d";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=10&&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemperature);
}
navigator.geolocation.getCurrentPosition(currentPosition);

function currentTemperature(response) {
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#cityCurrent").innerHTML = response.data.name;
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", getPosition);

searchCity("Paris");
