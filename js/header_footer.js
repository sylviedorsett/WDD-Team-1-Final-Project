//Create a date object and populate it into the footer dynamically
const d = new Date();
const date = d.getDate;
const day = d.getDay();
const month = d.getMonth();
const year = d.getFullYear();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const dateString = `${dayNames[day]}, ${monthNames[month]} ${day}, ${year}`;
document.getElementById("date-string").innerHTML = dateString;
document.getElementById("year").innerHTML = year;