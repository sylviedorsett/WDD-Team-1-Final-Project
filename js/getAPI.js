//Import all Classes
import {getLocalStorage} from ".utils.mjs";
import WeatherSummary from "./weather_summary.mjs";
import Forecast from "./forecast.mjs";
import Maps from "./maps.mjs";

export default class GetAPI {
    constructor() {
      this.city = "";
      this.latitude = "";
      this.longitude = "";
      this.degreeType = "";
    }

    init() {
      this.city = getLocalStorage("city");
      this.getGeoAPI();
      this.getCurrentWeather();
      this.getForecast();
      this.getMap();
    }
  
    //A function that fetches the geo location of a city
    //WE NEED TO DO ERROR HANDLING HERE IF THE CITY IS NOT FOUND
    async getGeoAPI() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=850f85405ab713d96880a077b3067953`);
      const geoAPI = await response.json();
      //USE A TRY CATCH TO HANDLE THE ERROR IF THE CITY ISN'T FOUND IN THE API
      this.longitude = geoAPI.coord.lon;
      this.latitude = geoAPI.coord.lat;
      
    }
  
    //A function that creates an instance of the WeatherSummary Class
    async getCurrentWeather() {
      const weatherSummary = new WeatherSummary(this.latitude, this.longitude, this.degreeType);
      weatherSummary.init();
    }
  
    //A function that creates an instance of the Forecast Class
    async getForecast() {
      const forecast = new Forecast(this.latitude, this.longitude, this.degreeType);
      forecast.init();

      //const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${this.longitude}&appid=850f85405ab713d96880a077b3067953`);
      //this.forecastAPI = await response.json();
    }

    //A function that creates an instance of the Maps Class
    async getMaps() {
      const map = new Maps(this.latitude, this.longitude);
      map.init();
    }
  }
  