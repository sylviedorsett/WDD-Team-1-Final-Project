// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Sunday-thru-Monday-Inator
export function sundayThruMondayInator(dayOfWeekNumber){
    let daysInWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return daysInWeek[dayOfWeekNumber];
}
export function mode(array) {
    //checking to see if the array is empty first to not get errors from this function
    if (array.length === 0) {
        return null;
    }

    let frequency = {};
    let biggestFrequency = 0;
    let mode;
    
    for (let i = 0; i < array.length; i++) {
        // creating a new key value pair in the object frequency for each item in the list and using the object itself as the key and the count as the value, the count (or value) increments by 1 each time the new key is found in the array
        let item = array[i];
        if (frequency[item]) {
            frequency[item]++;
        } else {
            frequency[item] = 1;
        }
        // generic mode stuff, if the new number is bigger, use it instead of the old one. This particular model favors 1. Whichever number is bigger, then 2. Whichever number came first.
        if (frequency[item] > biggestFrequency) {
            biggestFrequency = frequency[item];
            mode = item;
        }
    }
    
    return mode;
}
export function average(array) {
    // double checking the array is not empty to avoid errors
    if (array.length === 0) {
        return null;
    }

    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }

    return sum / array.length;
}