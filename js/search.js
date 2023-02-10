// Autosuggests cities as you type in the search bar

const searchInput = document.getElementById("search-input");
const suggestList = document.getElementById("suggest-list");

searchInput.addEventListener("input", async function() {
  suggestList.innerHTML = "";
  const inputValue = searchInput.value;
  if (!inputValue) return;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/find?q=${inputValue}&units=metric&appid=850f85405ab713d96880a077b3067953`
  );
  const data = await response.json();
  const cities = data.list;

  for (const city of cities) {
    const li = document.createElement("li");
    if (city.state) {
      li.textContent = `${city.name}, ${city.state}, ${city.sys.country}`;
    } else {
      li.textContent = `${city.name}, ${city.sys.country}`;
    }
    suggestList.appendChild(li);
  }
});