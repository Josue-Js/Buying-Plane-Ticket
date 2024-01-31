import { fetchWeatherApi } from 'openmeteo';


const url = "https://api.open-meteo.com/v1/meteofrance";

export async function queryWeather({ latitude, longitude }: { latitude: number, longitude: number }) {

  var params = {
    "latitude": latitude,
    "longitude": longitude,
    "current": ["temperature_2m", "relative_humidity_2m", "rain", "wind_speed_10m"],
    "temperature_unit": "fahrenheit",
    "wind_speed_unit": "ms",
    "timezone": "auto",
    "forecast_days": 1
  };

  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];
  const current = response.current()!;
  const utcOffsetSeconds = response.utcOffsetSeconds();


  return {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    temperature2m: Math.floor(current.variables(0)!.value()),
    relativeHumidity2m: current.variables(1)!.value(),
    rain: Math.floor(current.variables(2)!.value()),
    windSpeed10m: Math.floor(current.variables(3)!.value()),
  };
}
