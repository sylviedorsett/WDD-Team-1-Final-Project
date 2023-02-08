import { sundayThruMondayInator, mode, average } from "./utils.mjs";

//A function to convert responses to json and checks if ok
async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw {name: "servicesError", message: data};
    }
  }

class Forecast {
    constructor(lat, long, deg) {
        this.latitude = lat;
        this.longitude = long;
        this.apiKey = "4491eb92629e7b5e0ac20b732e39129e";
        this.degreeType = deg;
        // setting up some text for display in the forecast
        this.degreeSymbol = "";
        this.windSpeed = "";
        if (this.degreeType == "metric"){
            this.degreeSymbol = "C";
            this.windSpeed = "kph";
        } else if (this.degreeType == "imperial") {
            this.degreeSymbol = "F";
            this.windSpeed = "mph";
        }   
    }

    init() {
        this.createURL();
        this.getForecast();
        this.renderSummary();      
    }

    //create the url path for the specified city and degree type
    createURL() {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${this.longitude}&units=${this.degreeType}&appid=${this.apiKey}`;
    }

    //fetch the data from the Current Weather API
    async getForecast() {
        const url = this.createURL();
        const response = await fetch(url).then(convertToJson);
        this.populateSummaries(response);
    }
    
    // ***************************Start 3-hour Section*****************************************//
    
    

    //A function that returns a string literal to populate the five-day-forecast container
    renderSummary(number) {
        
        return `<h3 id="day-${number}"></h3>
        <p>High:<span id="high-temp-${number}"></span>°${this.degreeSymbol}</p>
        <p>Low:<span id="low-temp-${number}"></span>°${this.degreeSymbol}</p>
        <img id="weatherImage-${number}" src="">
        <p>Wind:<span id="windSpeed-${number}"></span> ${this.windSpeed}</p>
        <p><span id="weathDesc-${number}"></span></p>
        <button id="show-hide-button-${number}" class="hidden"></button>`
    }
    
    //A function that dynamically renders the five-day-forecast container
    populateSummaries(dataObject) {
        console.log(dataObject);
        // creating variables for the 5-day forecast cards
        let high_temp_max = -1000;
        let low_temp_min = 1000;
        let most_common_weather_obj_arrays = {"icon":[], "weather_desc":[]};
        let most_common_weather = {"icon":"", "weather_desc":""};
        let wind_speeds = [];
        let average_wind_speed = 0;
        let newDay = true;
        for(let i in dataObject.list) {

            //Use destructoring to enable readable code and pull specific properties from our object
            //getting the data from the dataObject.list, since this is a for loop, each const represents an individual (3) hourly forecast value
            const {temp_max, temp_min } = dataObject.list[i].main;
            const {speed} = dataObject.list[i].wind;
            const weatherImage = dataObject.list[i].weather[0].icon;
            const weathDesc = dataObject.list[i].weather[0].description;
            const dt = new Date(dataObject.list[i].dt * 1000);
            const dayOfWeek = sundayThruMondayInator(dt.getDay());
            const timeOfDay = dt.toLocaleTimeString("en-US", {hour: '2-digit'});

            

            // Taking the averages of the different days' hourly reports to display for the 5 day forecast
            if(!document.getElementById(`five-day-forecast-${dayOfWeek}`)){
                let fiveDayHTML = this.renderSummary(dayOfWeek);
                let dayAverageSummaryForecast = document.createElement("section");
                dayAverageSummaryForecast.id = `five-day-forecast-${dayOfWeek}`;
                dayAverageSummaryForecast.className = "five-day-forecast";
                document.getElementById(`five-day-forecast-sections`).appendChild(dayAverageSummaryForecast);
                document.getElementById(`five-day-forecast-${dayOfWeek}`).innerHTML = fiveDayHTML;
                document.getElementById(`day-${dayOfWeek}`).textContent = `${dayOfWeek}`;
                document.getElementById(`show-hide-button-${dayOfWeek}`).addEventListener("click", () => {for(let i in document.getElementsByClassName(`${dayOfWeek}`)){document.getElementsByClassName(`${dayOfWeek}`)[i].classList.toggle("hidden")}});
                newDay = true;
            }

            // Calculating highs, lows, and averages for 5-day
            if(newDay){
                // resetting variables for new day
                high_temp_max = -1000;
                low_temp_min = 1000;
                most_common_weather_obj_arrays = {"icon":[], "weather_desc":[]};
                most_common_weather = {"icon":"", "weather_desc":""};
                wind_speeds = [];
                average_wind_speed = 0;
            }
            // Low for day
            if(low_temp_min > temp_min){
                low_temp_min = temp_min;
            }
            // High for day
            if(high_temp_max < temp_max){
                high_temp_max = temp_max;
            }
            // Most common weather for day
            most_common_weather_obj_arrays["icon"].push(weatherImage);
            most_common_weather_obj_arrays["weather_desc"].push(weathDesc);
            most_common_weather["icon"] = mode(most_common_weather_obj_arrays["icon"]);
            most_common_weather["weather_desc"] = mode(most_common_weather_obj_arrays["weather_desc"]);

            // average winds speeds for day
            wind_speeds.push(speed);
            average_wind_speed = average(wind_speeds);

            // variable to manage calculating highs and lows for individual days, resets to true in the if statement that checks if the document already has a section element for the particular day roughly thirty lines above this as of right now.
            newDay = false;

            //grab 5-day averages containers by their id's and populate them with results calculated with data from the API
            
            document.getElementById(`high-temp-${dayOfWeek}`).textContent = `\u00A0\u00A0${Math.floor(high_temp_max)}`;
            document.getElementById(`low-temp-${dayOfWeek}`).textContent = `\u00A0\u00A0${Math.floor(low_temp_min)}`;
            document.getElementById(`weatherImage-${dayOfWeek}`).src = `http://openweathermap.org/img/wn/${most_common_weather["icon"]}@2x.png`;
            document.getElementById(`weathDesc-${dayOfWeek}`).textContent = `${most_common_weather["weather_desc"]}`;
            document.getElementById(`windSpeed-${dayOfWeek}`).textContent = `\u00A0\u00A0${Math.ceil(average_wind_speed)}`;
            document.getElementById(`show-hide-button-${dayOfWeek}`).innerHTML = `show/hide 3-hour forecast`;
            document.getElementById(`show-hide-button-${dayOfWeek}`).classList.remove("hidden");
            

            const htmlString = this.renderSummary(i);
            let newSection = document.createElement("section");
            newSection.id = `five-day-forecast-${i}`;
            newSection.className = `five-day-forecast`;
            newSection.classList.toggle("hidden");
            newSection.classList.add(`${dayOfWeek}`);
            document.getElementById(`five-day-forecast-sections`).appendChild(newSection);
            document.getElementById(`five-day-forecast-${i}`).innerHTML = htmlString;
            


            //grab containers by their id's and populate them with data from the API
            document.getElementById(`day-${i}`).textContent = `${timeOfDay}`; // ${dayOfWeek.substring(0,3)} 
            document.getElementById(`high-temp-${i}`).parentElement.style = "grid-row: 2/3; font-size: 2em; margin-left: 0;";
            document.getElementById(`high-temp-${i}`).parentElement.innerHTML = `<span id="high-temp-${i}"></span>°${this.degreeSymbol}`;
            document.getElementById(`high-temp-${i}`).textContent = `\u00A0\u00A0${Math.floor(temp_max)}`;
            document.getElementById(`low-temp-${i}`).parentElement.parentElement.style = "grid-template-rows: auto auto;";
            document.getElementById(`low-temp-${i}`).parentElement.innerHTML = "";
            
            document.getElementById(`weatherImage-${i}`).src = `http://openweathermap.org/img/wn/${weatherImage}@2x.png`
            document.getElementById(`weathDesc-${i}`).textContent = `${weathDesc}`;
            document.getElementById(`windSpeed-${i}`).textContent = `\u00A0\u00A0${Math.ceil(speed)}`;

        }
    }    
    // ***************************End 3-hour Section*****************************************//

}


const forecast_placeholder = new Forecast("41.2230", "-111.9738", "imperial");
forecast_placeholder.init();