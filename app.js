//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key};

const weatherAPI = {
  key: "c700145d8bcb37ca5a45ad17b22a6159",
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
};

const searchBox = document.getElementById("usr_input");

searchBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    console.log(searchBox.value);
    getWeatherReport(searchBox.value);
    document.querySelector(".weather-body").style.display = "block";
  }
});

function getWeatherReport(city) {
  fetch(`${weatherAPI.baseURL}?q=${city}&appid=${weatherAPI.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

function showWeatherReport(weather) {
  console.log(weather);
  let city = document.getElementById("city");
  city.innerHTML = `${weather.name},${weather.sys.country}`;

  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minMax = document.getElementById("max-min");
  minMax.innerHTML = `${Math.round(
    weather.main.temp_max
  )}&deg;C(max)/ ${Math.round(weather.main.temp_min)}&deg;C(min)`;

  let weatherType = document.getElementById("weather");
  weatherType.innerHTML = `${weather.weather[0].main}`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerHTML = dateManage(todayDate);

  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('clear.jpg')";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('cloudy.jpg')";
  } else if (weatherType.textContent == "Dust") {
    document.body.style.backgroundImage = "url('dusty.jpg')";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('rain.jpg.jpg')";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('snow.jpg.jpg')";
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url('thunder.jpg')";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('haze.jpg')";
  }
}

function dateManage(dateValue) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateValue.getFullYear();
  let month = months[dateValue.getMonth()];
  let day = days[dateValue.getDay()];
  let date = dateValue.getDate();

  return `${date} ${month} (${day}),${year}`;
}
