
//import {getLocalStorage} from "utils.js";

//A function to convert responses to json and checks if ok
async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw {name: "servicesError", message: data};
    }
  }

class WeatherSummary {
    constructor() {
        //from Local Storage get the latitude, longitude, 
        //and units of measurement preference for the degrees
        this.latitude = "51.5072°"//getLocalStorage("lat");
        this.longitude = "0.1276"//getLocalStorage("long");
        this.apiKey = "4491eb92629e7b5e0ac20b732e39129e";
        this.degreeType = "metric"//getLocalStorage("degree-preference")
    }

    async init() {
        this.createURL();
        const data = this.getCurrentWeather();
        this.renderSummary();
        this.populateSummary(data);
    }

    //create the url path for the specified city and degree type
    createURL() {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units${degreeType}&appid=${apiKey}`;
    }

    //fetch the data from the Current Weather API
    async getCurrentWeather() {
        const url = this.createURL();
        console.log(url);
        const response = await fetch(url).then(convertToJson);
        console.log(response);
        return response;
    }

    //A function that calculates the windchill
    calculateWindChill() {
        var t = parseFloat(document.getElementById("currentTemp").innerHTML);
        var s = parseFloat(document.getElementById("windSpeed").innerHTML);
        var chill = 35.74 + .6215 * t - 35.75 * Math.pow(s, .16) +  .4275 * t * Math.pow(s, .16);
        if (t < 51 && s > 3) {
            document.getElementById("windChill").innerHTML = Math.round(chill);
        }
        else {
            document.getElementById("windChill").innerHTML = "N/A";
        }
    }

    //A function that returns a string literal to populate the Weather Summary div container
    renderSummary() {
        if (this.degreeType == "metric"){
            return `<p>Currently: <span id="currentTemp"></span>°C</p>
            <p>Today's High: <span id="high-temp"></span>°C</p>
            <p>Today's Low: <span id="low-temp"></span>°C</p>
            <p>Humidity: <span id="humidity"></span>%</p>
            <p>Wind Speed: <span id="windSpeed"></span> mph</p>
            <p>Wind Chill: <span id="windChill"></span></p>`
        }
        else if (this.degreeType == "imperial") {
            return `<p>Currently: <span id="currentTemp"></span>°F</p>
            <p>Today's High: <span id="high-temp"></span>°F</p>
            <p>Today's Low: <span id="low-temp"></span>°F</p>
            <p>Humidity: <span id="humidity"></span>%</p>
            <p>Wind Speed: <span id="windSpeed"></span> mph</p>
            <p>Wind Chill: <span id="windChill"></span></p>`
        }
    }
    //A function that dynamically renders the Weather Summary div container
    populateSummary(dataObject) {
        //Use destructoring to enable readable code and pull specific properties from our object
        const {main, wind} = dataObject;
        const {temp, temp_max, temp_min, humidity, } = main;
        const {speed} = wind;
        console.log(temp, temp_max, temp_min, humidity, speed);

        //grab containers by their id's and populate them with data from the API
        document.getElementById('currentTemp').textContent = Math.floor(temp);
        document.getElementById('high-temp').textContent = Math.floor(temp_max);
        document.getElementById('low-temp').textContent = Math.floor(temp_min);
        document.getElementById('humidity').textContent = humidity;
        document.getElementById('windSpeed').textContent = Math.ceil(speed);
        document.getElementById('windChill').textContent = this.calculateWindChill();
    }    
}

const weather_summary = new WeatherSummary();