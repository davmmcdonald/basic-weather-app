const body = document.getElementById('body');
const zipCode = document.getElementById('zipCode');
const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');

zipCode.addEventListener('change', updateWeather);

function updateWeather() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=5f62ab4b1dfb49de9a7223916230604&q=${zipCode.value}`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        city.innerHTML = `<i class="fa-solid fa-location-arrow"></i> ${response.location.name}, ${response.location.region}`;
        temperature.innerText = `${Math.round(response.current.temp_f)}° F`;
        condition.innerText = response.current.condition.text;
        updateTime(response.location.localtime);
    })
    .catch(error => {
        console.log(error);
        city.innerText = 'No matching location found!';
    });
}

function updateTime(localTime) {
    localTime = localTime.split(' ')[1].split(':')[0];
    console.log(localTime);
    if (localTime > 20 || localTime < 6) {
        console.log('night');
        body.style.backgroundImage = `linear-gradient(rgba(25,25,112, 0.85), rgba(25,25,112, 0.5)), url("assets/6231375.jpg")`;
    } else if (localTime > 6 && localTime < 20) {
        console.log('day');
        body.style.backgroundImage = `linear-gradient(rgba(135, 206, 235, 0.85), rgba(135, 206, 235, 0.5)), url("assets/6231375.jpg")`;
    } else {
        console.log('dawn / dusk');
        body.style.backgroundImage = `linear-gradient(rgba(255, 87, 51 , 0.85), rgba(255, 87, 51 , 0.5)), url("assets/6231375.jpg")`;
    }
}

updateWeather();