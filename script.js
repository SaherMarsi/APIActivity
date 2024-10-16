const clientId = "8764423d29574647b60154821241610"; 
const searchResults = document.getElementById("resultBox");

function searchUsingXHR() {
    searchResults.innerHTML = ""; 
    let keyword = document.getElementById("searchBox").value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayWeather(data);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error('Error:', xhr.status, xhr.statusText);
        }
    };
    xhr.open('GET',`http://api.weatherapi.com/v1/forecast.json?key=${clientId}&q=${keyword}&days=1`, true);// true for async request
    xhr.send();
}

function displayWeather(data) {
    const highTemp = data.forecast.forecastday[0].day.maxtemp_c;
    const lowTemp = data.forecast.forecastday[0].day.mintemp_c;
    const windspeed = data.forecast.forecastday[0].day.maxwind_kph;
    searchResults.innerHTML = `
        <p>High: ${highTemp} C</p>
        <p>Low: ${lowTemp} C</p>
        <p>Wind Speed: ${windspeed}</p>
    `;
}
