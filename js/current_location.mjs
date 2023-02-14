import { setLocalStorage } from "./utils.mjs";

  const cityEl = document.getElementById("city");
  const getLocationBtn = document.getElementById("getLocationBtn");

  getLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiKey = "850f85405ab713d96880a077b3067953";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        const data = await response.json();
        cityEl.innerHTML = `Your current city is: ${data.name}`;
        setLocalStorage("city", data.name);
        setLocalStorage("lat", latitude);
        setLocalStorage("lon", longitude);
    //   }
    //   , (error) => {
    //     switch (error.code) {
    //       case error.PERMISSION_DENIED:
    //         cityEl.innerHTML = "User denied the request for Geolocation.";
    //         break;
    //       case error.POSITION_UNAVAILABLE:
    //         cityEl.innerHTML = "Location information is unavailable.";
    //         break;
    //       case error.TIMEOUT:
    //         cityEl.innerHTML = "The request to get user location timed out.";
    //         break;
    //       case error.UNKNOWN_ERROR:
    //         cityEl.innerHTML = "An unknown error occurred.";
    //         break;
    //       default:
    //         cityEl.innerHTML = "An unknown error occurred.";
    //     }
      });
    } else {
      cityEl.innerHTML = "Geolocation is not supported by this browser.";
    }
  });

