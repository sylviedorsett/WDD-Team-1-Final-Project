async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw {name: "servicesError", message: data};
    }
  }

export default class Maps {
    constructor() {
        this.apiKey = "4491eb92629e7b5e0ac20b732e39129e";
        this.rainMapURL = "";
        this.cloudMapURL = "";
    }

    init() {
        //create the urls for the maps
        this.rainMapURL = this.createURL("precipitation_new");
        this.cloudMapURL = this.createURL("clouds_new");
        this.getMaps();       
    }

    createURL(mapType) {
        return `https://tile.openweathermap.org/map/${mapType}/3/5/5.png?appid=${this.apiKey}`;
    }

    async getMaps() {
        const response1 = await fetch(this.rainMapURL).then(convertToJson);
        const response2 = await fetch(this.cloudMapURL).then(convertToJson);
   
        this.populateMaps(response1, response2);
    }

    renderMaps(map1, map2) {
        return `<img src="${map1}" id="rainMap" alt="Rain Map" width="100rem"
        <img src="${map2}" id="cloudMap" alt="Cloud Map" width="100rem"
        `
    }

    populateMaps(res1, res2) {
        const rainURL = res1.url;
        const cloudURL = res2.url;
        const htmlString = this.renderMaps(rainURL, cloudURL);

        document.getElementsByClassName("maps-div").innerHtml = htmlString;
    }

}


//const maps = new Maps();
//maps.init();

