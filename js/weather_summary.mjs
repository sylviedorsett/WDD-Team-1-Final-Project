//A function to convert responses to json and checks if ok
async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw {name: "servicesError", message: data};
    }
  }

export default class WeatherSummary {
    constructor(lat, long, deg) {
        this.latitude = lat;
        this.longitude = long;
        this.apiKey = "4491eb92629e7b5e0ac20b732e39129e";
        this.degreeType = deg;
    }

    init() {
        this.createURL();
        this.getCurrentWeather();
        this.renderSummary();        
    }

    //create the url path for the specified city and degree type
    createURL() {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=${this.degreeType}&appid=${this.apiKey}`;
    }

    //fetch the data from the Current Weather API
    async getCurrentWeather() {
        const url = this.createURL();
        const response = await fetch(url).then(convertToJson);
        this.populateSummary(response);
    }

    //A function that calculates the windchill
    calculateWindChill() {
        var t = parseFloat(document.getElementById("currentTemp").innerHTML);
        var s = parseFloat(document.getElementById("windSpeed").innerHTML);
        var chill = 35.74 + .6215 * t - 35.75 * Math.pow(s, .16) +  .4275 * t * Math.pow(s, .16);
        if (t < 51 && s > 3) {
            document.getElementById("windChill").innerHTML = `\u00A0\u00A0${Math.round(chill)}°`;
        }
        else {
            document.getElementById("windChill").innerHTML = `\u00A0\u00A0N/A`;
        }
    }

    //A function that returns a string literal to populate the Weather Summary div container
    renderSummary() {
        if (this.degreeType == "metric"){
            return `<h3 id="city-name"></h3>
            <p>Currently: <span id="currentTemp"></span>°C</p>
            <p>High: <span id="high-temp"></span>°C</p>
            <p>Low: <span id="low-temp"></span>°C</p>
            <p>Humidity: <span id="humidity"></span>%</p>
            <p>Wind Speed: <span id="windSpeed"></span> mph</p>
            <p>Wind Chill: <span id="windChill"></span></p>`
        }
        else if (this.degreeType == "imperial") {
            return `<h3 id="city-name"></h3>
            <p>Currently: <span id="currentTemp"></span>°F</p>
            <p>High: <span id="high-temp"></span>°F</p>
            <p>Low: <span id="low-temp"></span>°F</p>
            <p>Humidity: <span id="humidity"></span>%</p>
            <p>Wind Speed: <span id="windSpeed"></span> mph</p>
            <p>Wind Chill: <span id="windChill"></span></p>`
        }
    }
    //A function that dynamically renders the Weather Summary div container
    populateSummary(dataObject) {
        const htmlString = this.renderSummary();
        document.getElementById("weather-summary").innerHTML = htmlString;

        //Use destructoring to enable readable code and pull specific properties from our object
        const {temp, temp_max, temp_min, humidity, } = dataObject.main;
        const {speed} = dataObject.wind;
        const {name} = dataObject;

        //grab containers by their id's and populate them with data from the API
        document.getElementById('city-name').innerHTML = `${name}:`;
        document.getElementById('currentTemp').textContent = `\u00A0\u00A0${Math.floor(temp)}`;
        document.getElementById('high-temp').textContent = `\u00A0\u00A0${Math.floor(temp_max)}`;
        document.getElementById('low-temp').textContent = `\u00A0\u00A0${Math.floor(temp_min)}`;
        document.getElementById('humidity').textContent = `\u00A0\u00A0${humidity}`;
        document.getElementById('windSpeed').textContent = `\u00A0\u00A0${Math.ceil(speed)}`;
        this.calculateWindChill();
    }    
}

const weather_summary_placeholder = new WeatherSummary("51.5085", "-0.1257", "metric");
weather_summary_placeholder.init();

// ////////////////////////////////////
// // TEST
// // create an instance of class from the user's location from the search bar

// // Function to handle user input from the search bar
// async function handleSearch(event) {
//     event.preventDefault();
  
//     // Get the location input from the user
//     const location = document.getElementById("search").value;
  
//     // API endpoint to retrieve location data
//     const locationEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=4491eb92629e7b5e0ac20b732e39129e`;
  
//     try {
//       const locationResponse = await fetch(locationEndpoint);
//       const locationData = await locationResponse.json();
  
//       // Create an instance of the WeatherSummary class
//       const weatherSummary = new WeatherSummary(
//         locationData.lat,
//         locationData.lon,
//         "metric"
//       );
  
//       // Call the getWeatherData method to retrieve the weather data
//       weatherSummary.getWeatherData();
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const searchForm = document.getElementById("search-form");
// searchForm.addEventListener("submit", handleSearch);