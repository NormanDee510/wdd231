// Hamburger Menu Toggle
const menuButton = document.getElementById('menuButton');
const navList = document.getElementById('navList');

menuButton.addEventListener('click', () => {
    navList.classList.toggle('show');
});

// Current Year & Last Modified
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Weather API (OpenWeatherMap)
const apiKey = 'fedee1bda77db668700d17714b8e825e';
const city = 'Johannesburg';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

// Capitalize each word in a string
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Fetch Current Weather
async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        const weatherEl = document.getElementById('current-weather');

        const descriptions = data.weather.map(w => capitalizeWords(w.description)).join(', ');
        const temp = Math.round(data.main.temp); // No decimal

        weatherEl.innerHTML = `
            <p>Condition: ${descriptions}</p>
            <p>Temperature: ${temp}°C</p>
        `;
    } catch (error) {
        console.error('Weather fetch error:', error);
    }
}

// Fetch 3-Day Forecast
async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        const forecastEl = document.getElementById('forecast');
        forecastEl.innerHTML = '<h3>3-Day Forecast:</h3>';

        let daysAdded = 0;
        const displayedDates = new Set();

        data.list.forEach(forecast => {
            const dateObj = new Date(forecast.dt_txt);
            const day = dateObj.toDateString();

            if (!displayedDates.has(day) && daysAdded < 3) {
                const descriptions = forecast.weather.map(w => capitalizeWords(w.description)).join(', ');
                const temp = Math.round(forecast.main.temp); // No decimal
                forecastEl.innerHTML += `<p>${day}: ${descriptions}, ${temp}°C</p>`;
                displayedDates.add(day);
                daysAdded++;
            }
        });
    } catch (error) {
        console.error('Forecast fetch error:', error);
    }
}

getWeather();
getForecast();

// Spotlights (Assuming chamberMembers.json file exists)
async function loadSpotlights() {
    try {
        const response = await fetch('data/chamberMembers.json');
        const data = await response.json();
        const goldSilverMembers = data.members.filter(member => member.membership === 'Gold' || member.membership === 'Silver');
        
        // Shuffle and pick 2-3 random members
        goldSilverMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = goldSilverMembers.slice(0, Math.floor(Math.random() * 2) + 2); // Randomly pick 2 or 3

        const spotlightContainer = document.getElementById('spotlight-container');
        spotlightContainer.innerHTML = ''; // Clear existing

        selectedMembers.forEach(member => {
            const spotlight = document.createElement('div');
            spotlight.classList.add('spotlight');
            spotlight.innerHTML = `
                <h3>${member.name}</h3>
                <img src="${member.logo}" alt="${member.name} Logo">
                <p>Phone: ${member.phone}</p>
                <p>Address: ${member.address}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                <p>Membership: ${member.membership}</p>
            `;
            spotlightContainer.appendChild(spotlight);
        });
    } catch (error) {
        console.error('Spotlights fetch error:', error);
    }
}

loadSpotlights();
