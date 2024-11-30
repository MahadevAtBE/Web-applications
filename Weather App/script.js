// global variables
const input = document.querySelector(".inp");
const inputBtn = document.querySelector(".btn");
let city_name = document.querySelector(".city_name");

// search button 
inputBtn.addEventListener("click", () => {
    if (input.value == "") {
        city_name.innerHTML = '<h2 class="city_name error">Empty Field!</h2>'
    }
    else {
        ApiCall();
        changeBtn();
    }
})
// search on enter key 
window.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        ApiCall();
        changeBtn();
    }
})

// function to call open weather api 
async function ApiCall() {
    let city = input.value;
    let apiKey = "029f8ca43053e6fd05a67c2935b361f7";
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        let responce = await fetch(api);
        let data = await responce.json();
        getValue(data);
    } catch (error) {
        city_name.innerHTML = '<h2 class="city_name error">no match found!</h2>';
        document.querySelector(".weatherImg").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>'
    }
}

// function to extrect wanted data from api responce 
function getValue(data) {
    let cityName = data.name;
    let temp = Math.round(data.main.temp);
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    let weatherType = data.weather[0].main;
    printValue(cityName, temp, humidity, windSpeed, weatherType);
    console.log(cityName, temp, humidity, windSpeed, weatherType);
}

// function to print all values to html 
function printValue(cityName, temp, humidity, windSpeed, weatherType) {
    document.querySelector(".temp").innerText = `${temp}°C`;
    city_name.innerText = cityName;
    document.querySelector(".Humidity").innerText = `${humidity}%`;
    document.querySelector(".windSpeed").innerText = `${windSpeed} km/h`;
    let weatherImg = document.querySelector(".weatherImg");
    if (weatherType == "Clear") {
        weatherImg.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    else if (weatherType == "Rain") {
        weatherImg.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
    }
    else if (weatherType == "Haze" || weatherType == "Mist") {
        weatherImg.innerHTML = '<i class="fa-solid fa-smog"></i>';
    }
    else if (weatherType == "HazThunderstorme") {
        weatherImg.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
    }
    else if (weatherType == "Clouds") {
        weatherImg.innerHTML = '<i class="fa-solid fa-cloud"></i>';
    }
    else if (weatherType == "Snow") {
        weatherImg.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
    }

}

// function to toggel between search btn and x btn 
function changeBtn() {
    if (input.value != "") {
        inputBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        inputBtn.addEventListener("click", () => {
            input.value = "";
            inputBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
        })

        window.addEventListener("keypress", (e) => {
            if (e.key == "Enter") {
                input.value = "";
                inputBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';

            }
        })
    }
    else {
        inputBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    }
}