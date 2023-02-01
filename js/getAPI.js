export default class GetAPI {
    constructor(city) {
      this.city = city;
    }
  
    async getGeoAPI() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=850f85405ab713d96880a077b3067953`);
      const geoAPI = await response.json();
      this.longitude = geoAPI.coord.lon;
      this.latitude = geoAPI.coord.lat;
      this.getCurrentWeather();
      this.getForecast();
    }
  
    async getCurrentWeather() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=850f85405ab713d96880a077b3067953`);
      this.currentWeatherAPI = await response.json();
    }
  
    async getForecast() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${this.longitude}&appid=850f85405ab713d96880a077b3067953`);
      this.forecastAPI = await response.json();
    }
  }
  