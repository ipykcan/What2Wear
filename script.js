
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const temperatureEl = document.getElementById("temperature");
const cityEl = document.getElementById("cityName");
const weatherIconEl = document.getElementById("weatherIcon");
const weatherEl = document.getElementById("weatherName")

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Enter a city name");
        return;
    }

    getWeather(city);
});

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const weatherMain = data.weather[0].main;
        const cityName = data.name;
        const country = data.sys.country;

      
        temperatureEl.innerHTML = `${temp}&deg;C`;
        weatherEl.innerHTML = `${weatherMain}`
        
        cityEl.innerHTML = `${cityName}<br>${country}`;
        updateOutfit(temp, weatherMain);
        document.querySelector(".result").style.display = "flex";
        
        if (weatherMain === "Clear") {
            weatherIconEl.src = "sunny.png";
            document.body.style.backgroundColor ="rgb(255, 241, 218)";
        } 
        
        else if (weatherMain === "Clouds") {
            weatherIconEl.src = "cloudy.png";
             document.body.style.backgroundColor ="rgb(220, 233, 237)";
        } 
        else if (weatherMain === "Rain" || weatherMain === "Drizzle") {
            weatherIconEl.src = "rain.png";
            document.body.style.backgroundColor ="rgb(185, 185, 185)";
        } 
        else if (weatherMain === "Snow") {
           weatherIconEl.src = "snow.png";
            document.body.style.backgroundColor ="rgb(228, 228, 228)";
        }
        else {
             weatherIconEl.src = "cloudy.png";
             document.body.style.backgroundColor ="rgb(220, 233, 237)";
        }

    } catch (error) {
        alert("City not found or API error");
        console.log(error);
    }
}

function updateOutfit(temp, weatherMain) {

    const outfitImage = document.getElementById("outfitImage");
    const outfitText = document.getElementById("outfitText");

    if (weatherMain === "Rain" || weatherMain === "Drizzle") {
        outfitImage.src = "umbrella.png";
        outfitText.innerText = "Carry an umbrella and wear waterproof footwear.";
    }

    else if (temp < 10) {
        outfitImage.src = "jacket.jpeg";
        outfitText.innerText = "Wear a heavy jacket and warm layers.";
    }

    else if (temp >= 10 && temp < 20) {
        outfitImage.src = "hoodie.jpeg";
        outfitText.innerText = "A light jacket or hoodie will be perfect.";
    }

    else if (temp >= 20 && temp < 30) {
        outfitImage.src = "summer.jpg";
        outfitText.innerText = "Comfortable t-shirt and jeans recommended.";
    }

    else {
        outfitImage.src = "summer.jpg";
        outfitText.innerText = "Light cotton clothes and stay hydrated!";
    }
}
