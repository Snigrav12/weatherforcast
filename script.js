document.getElementById('submitButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    fetchWeatherData(location);
});

async function fetchWeatherData(location) {
    const apiKey = 'ce4a56a36773f064140813e8fa1ba5ca'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        displayWeatherData(data);
        clearErrorMessage();
    } catch (error) {
        displayError(error.message);
    }
   
}

function displayWeatherData(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
    `;
}

function displayError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
}

function clearErrorMessage() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '';
}
