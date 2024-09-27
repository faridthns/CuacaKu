const container = document.querySelector(".container");
const search = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener ('keydown', function(event) {
    if (event.key === 'Enter') {
        const APIKey = '96938a2b9707df1e8615ec110b3e2eff';
        const city = document.querySelector('.search-box input').value;
    
        if (city == '')
            return;
    
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${APIKey}`).then(response => response.json()).then(json => {
    
                if (json.cod == '404') {
                    cityHide.textContent = city;
                    container.style.height = '400px';
                    weatherBox.classList.remove('active');
                    weatherDetails.classList.remove('active');
                    error.classList.add('active');
                    return;
                    
                }
    
                const image = document.querySelector(".weather-box img");
                const temperature = document.querySelector(".weather-box .temperature");
                const description = document.querySelector(".weather-box .description");
                const humidity = document.querySelector(".weather-details .humidity span");
                const wind = document.querySelector(".weather-details .wind span");
    
                if (cityHide.textContent == city) {
                    return;
                } else {
                    cityHide.textContent = city;
    
                    container.style.height = '555px';
                    container.classList.add('active');
                    weatherBox.classList.add('active');
                    weatherDetails.classList.add('active');
                    error.classList.remove('active');
    
                    setTimeout(() => {
                        container.classList.remove('active');
                    }, 2500);
    
                    console.log(json.weather[0].main);
                    switch (json.weather[0].main) {
                        case 'Clear':
                            image.src = 'img/clear.png';
                            container.style.background = '#87CEEB83';
                            break;
                    
                        case 'Rain':
                            image.src = 'img/rain.png';
                            container.style.background = '#1E90FF83';
                            break;
                    
                        case 'Snow':
                            image.src = 'img/snow.png';
                            container.style.background = '#FFFFFF83';
                            break;
                    
                        case 'Cloud':
                            image.src = 'img/cloud.png';
                            container.style.background = '#B0C4DE83';
                            break;
                    
                        case 'Mist':
                            image.src = 'img/mist.png';
                            container.style.background = '#C0C0C083';
                            break;
                    
                        case 'Haze':
                            image.src = 'img/mist.png';
                            container.style.background = '#F5F5DC83';
                            break;
                    
                        default:
                            image.src = 'img/cloud.png';
                            container.style.background = '#B0C4DE83';
                    }
    
                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                    description.innerHTML = `${json.weather[0].description}`;
                    humidity.innerHTML = `${json.main.humidity}<span>%</span>`;
                    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    
                    const infoWeather = document.querySelector('.info-weather');
                    const infoHumidity = document.querySelector('.info-humidity');
                    const infoWind = document.querySelector('.info-wind');
    
                    const elCloneInfoWeather = infoWeather.cloneNode(true);
                    const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                    const elCloneInfoWind = infoWind.cloneNode(true);

                    // if (infoHumidity.style.transform == 'translateY(-100%)' && infoWind.style.transform == 'translateY(-100%)') {
                    //     infoHumidity.style.visible = 'none';
                    //     infoWind.style.visible = 'none';
                    // }
    
                    elCloneInfoWeather.id = 'clone-info-weather';
                    elCloneInfoWeather.classList.add('active-clone');
    
                    elCloneInfoHumidity.id = 'clone-info-humidity';
                    elCloneInfoHumidity.classList.add('active-clone');
    
                    elCloneInfoWind.id = 'clone-info-wind';
                    elCloneInfoWind.classList.add('active-clone');
    
                    setTimeout(() => {
                        infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                        infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                        infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
                    }, 2200);
    
                    const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
                    const totalCloneInfoWeather = cloneInfoWeather.length;
                    const cloneInfoWeatherFirst = cloneInfoWeather[0];
    
                    const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                    const cloneInfoHumidityFirst = cloneInfoHumidity[0];
    
                    const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
                    const cloneInfoWindFirst = cloneInfoWind[0];
    
                    if (totalCloneInfoWeather > 0) {
                        cloneInfoWeatherFirst.classList.remove('active-clone');
                        cloneInfoHumidityFirst.classList.remove('active-clone');
                        cloneInfoWindFirst.classList.remove('active-clone');
    
                        setTimeout(() => {
                            cloneInfoWeatherFirst.remove();
                            cloneInfoHumidityFirst.remove();
                            cloneInfoWindFirst.remove();
                        }, 2200);
                    }
                }
            }) 
    }
})