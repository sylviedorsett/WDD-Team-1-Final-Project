import { sundayThruMondayInator } from "./utils.mjs";

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
        let degreeSymbol = "";
        let windSpeed = "";
        if (this.degreeType == "metric"){
            degreeSymbol = "C";
            windSpeed = "kph";
        } else if (this.degreeType == "imperial") {
            degreeSymbol = "F";
            windSpeed = "mph";
        } 
        return `<h3 id="day-${number}"></h3>
        <p>High: <span id="high-temp-${number}"></span>°${degreeSymbol}</p>
        <p>Low: <span id="low-temp-${number}"></span>°${degreeSymbol}</p>
        <img id="weatherImage-${number}" src="">
        <p>Wind: <span id="windSpeed-${number}"></span> ${windSpeed}</p>
        <p><span id="weathDesc-${number}"></span></p>`
    }
    //A function that dynamically renders the five-day-forecast container
    populateSummaries(dataObject) {
        console.log(dataObject);
        // creating variables for the 5-day forecast cards
        for(let i in dataObject.list) {

            //Use destructoring to enable readable code and pull specific properties from our object
            //getting the data from the dataObject.list, since this is a for loop, each const represents an individual (3) hourly forecast value
            const {temp_max, temp_min } = dataObject.list[i].main;
            const {speed} = dataObject.list[i].wind;
            const weatherImage = dataObject.list[i].weather[0].icon;
            const weathDesc = dataObject.list[i].weather[0].description;
            const dt = new Date(dataObject.list[i].dt * 1000);
            const dayOfWeek = sundayThruMondayInator(dt.getDay());
            const timeOfDay = dt.toLocaleTimeString("en-US", {hour: '2-digit'})


            

            // Taking the averages of the different days' hourly reports to display for the 5 day forecast
            if(!document.getElementById(`five-day-forecast-${dayOfWeek}`)){
                let fiveDayHTML = this.renderSummary(dayOfWeek);
                let dayAverageSummaryForecast = document.createElement("section");
                dayAverageSummaryForecast.id = `five-day-forecast-${dayOfWeek}`;
                dayAverageSummaryForecast.className = "five-day-forecast";
                document.getElementById(`five-day-forecast-sections`).appendChild(dayAverageSummaryForecast);
                document.getElementById(`five-day-forecast-${dayOfWeek}`).innerHTML = fiveDayHTML;
            }

            //grab 5-day averages containers by their id's and populate them with results calculated with data from the API
            console.log(`day-${dayOfWeek}`, document.getElementById(`day-${dayOfWeek}`))
            document.getElementById(`day-${dayOfWeek}`).textContent = `${dayOfWeek}`;
            document.getElementById(`high-temp-${dayOfWeek}`).textContent = `\u00A0\u00A0${Math.floor(temp_max)}`;
            document.getElementById(`low-temp-${dayOfWeek}`).textContent = `\u00A0\u00A0${Math.floor(temp_min)}`;
            document.getElementById(`weatherImage-${dayOfWeek}`).src = `http://openweathermap.org/img/wn/${weatherImage}@2x.png`
            document.getElementById(`weathDesc-${dayOfWeek}`).textContent = `${weathDesc}`;
            document.getElementById(`windSpeed-${dayOfWeek}`).textContent = `\u00A0\u00A0${Math.ceil(speed)}`;
            

            const htmlString = this.renderSummary(i);
            let newSection = document.createElement("section");
            newSection.id = `five-day-forecast-${i}`;
            newSection.className = `five-day-forecast`;
            newSection.classList.toggle("hidden");
            document.getElementById(`five-day-forecast-sections`).appendChild(newSection);
            document.getElementById(`five-day-forecast-${i}`).innerHTML = htmlString;
            


            //grab containers by their id's and populate them with data from the API
            document.getElementById(`day-${i}`).textContent = `${dayOfWeek.substring(0,3)} ${timeOfDay}`;
            document.getElementById(`high-temp-${i}`).textContent = `\u00A0\u00A0${Math.floor(temp_max)}`;
            document.getElementById(`low-temp-${i}`).textContent = `\u00A0\u00A0${Math.floor(temp_min)}`;
            document.getElementById(`weatherImage-${i}`).src = `http://openweathermap.org/img/wn/${weatherImage}@2x.png`
            document.getElementById(`weathDesc-${i}`).textContent = `${weathDesc}`;
            document.getElementById(`windSpeed-${i}`).textContent = `\u00A0\u00A0${Math.ceil(speed)}`;

        }
    }    
    // ***************************End 3-hour Section*****************************************//

}


const forecast_placeholder = new Forecast("51.5085", "-0.1257", "metric");
forecast_placeholder.init();