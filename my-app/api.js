export default function fetchWeather(city) {
    const API_KEY = "1dc5cc7be07e8e581cb3b61e7a3f4cb0";
    let url = "http://api.openweathermap.org/data/2.5/weather?q=${city},mode=json&units=metric" + API_KEY;
  
    return fetch(url).then((response) => response.json())
  }