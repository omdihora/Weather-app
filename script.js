const apiKey = "2aaaac93023be27e9916114403d7fd55"; // Replace with your OpenWeatherMap API Key

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.innerHTML = "⚠️ Please enter a city.";
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      result.innerHTML = `❌ ${data.message}`;
      return;
    }

    const { name, main, weather, wind } = data;
    result.innerHTML = `
      <strong>${name}</strong><br>
      🌡️ Temperature: ${main.temp}°C<br>
      🌥️ Condition: ${weather[0].description}<br>
      💧 Humidity: ${main.humidity}%<br>
      💨 Wind: ${wind.speed} m/s
    `;
  } catch (error) {
    result.innerHTML = "⚠️ Unable to fetch weather data.";
  }
}
