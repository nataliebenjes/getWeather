import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},{country code}&appid=${process.env.API_KEY}&units=imperial`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, zip);
    } else {
      printError(this, response, zip);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic
function printError(request, apiResponse, zip) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${zip}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, zip) {
  document.querySelector('#showResponse').innerText = `The humidity in ${zip} is ${apiResponse.main.humidity}%.
  The temperature in F is ${apiResponse.main.temp} degrees, wind speed is ${apiResponse.wind.speed} knots, .`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const zip = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});