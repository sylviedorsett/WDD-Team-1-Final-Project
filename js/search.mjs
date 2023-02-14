//Import all Classes
import {getLocalStorage, setLocalStorage} from "./utils.mjs";

// AUTOSUGGESTS LOCATIONS AS YOU TYPE IN THE SEARCH BAR

const searchInput = document.getElementById("search-input");
const suggestList = document.getElementById("suggest-list");
// When a user is typing in the search bar...
searchInput.addEventListener("input", async (event) => {
const value = event.target.value;

if (!value) {
suggestList.innerHTML = "";
return;
}

const response = await fetch(
`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=850f85405ab713d96880a077b3067953&units=metric`
);
const data = await response.json();

// When the location being typed by the user does not exist, it throws an error
if (data.cod === "404") {
suggestList.innerHTML = "City not found";
return;
}

// Makes every suggested location in the format of "city, country"
const suggestions = [`${data.name}, ${data.sys.country}`];
suggestList.innerHTML = suggestions
.map(
(suggestion) =>
`<li class="suggestion">${suggestion}</li>`
)
.join("");

// Makes every suggested location clickable so it's copied and pasted into the search bar
const suggestionElements = document.querySelectorAll(".suggestion");
suggestionElements.forEach((suggestionElement) => {
suggestionElement.addEventListener("click", (event) => {
searchInput.value = event.target.innerText;
suggestList.innerHTML = "";
});
});
});

// Enters the first suggested location when enter key is pressed
searchInput.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
const firstSuggestion = document.querySelector(".suggestion");
if (firstSuggestion) {
searchInput.value = firstSuggestion.innerText;
suggestList.innerHTML = "";
}
}
});

  

// FUNCTION TO RETRIEVE THE LOCATION ENTERED BY THE USER
function getLocation() {
const location = searchInput.value.split(',')[0];


// Confirm the city is in a compatible format
if (!location.match(/^[a-zA-Z\s]+$/)) {
throw new Error(`Invalid city format: ${location}`);
}
else {
    setLocalStorage("city", location);
    console.log(getLocalStorage("city"));
}
return location;
}

// CALL THE getLocation FUNCTION WHEN THE BUTTON IS CLICKED
document.getElementById("search").addEventListener("click", function() {
try {
const location = getLocation();

// Return the string of the city
console.log(`City: ${location}`);
} catch (error) {
console.error(error.message);
}
});
