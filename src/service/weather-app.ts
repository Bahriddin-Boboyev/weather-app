import {DateTime} from 'luxon'

const API_KEY = "1fa9ff4126d95b8db54f3897a208e91c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";


interface WeatherData {
  coord: {
    lat: number,
    lon: number
  },
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    humidity: number
  },
  name: string,
  dt: number,
  sys: {
    country: string,
    sunrise: number,
    sunset: number
  },
  weather: {
    main: string,
    icon: string
  }[],
  wind: {
    speed: number
  }
}



const getWeatherData = (infoType: string, searchParams: { [key: string]: string | number }) => {
  const url = new URL(BASE_URL + "/" + infoType);
  console.log(url.search);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }).toString();
  
  return fetch(url).then((response) => response.json());
};

const formatCurrentWeather = (data: WeatherData): { [key: string]: any } | undefined => {
  
    const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed },
    } = data;
    const { main: details, icon } = weather[0];

    return {
      lat,
      lon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      name,
      dt,
      country,
      sunrise,
      sunset,
      details,
      icon,
      weather,
      speed,
    };
};

const getFormattedWeatherData = async (searchParams: { [key: string]: string | number }) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then((data: any) => formatCurrentWeather(data));

  const { lat, lon }:any = formattedCurrentWeather;

  if (lat && lon) {
    const formattedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    }).then((data) => formatForecastWeather(data));

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  }
};

const formatToLocalTime = (
  secs: number,
  zone: string,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  if (secs && zone && format) {
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  }
};

function formatForecastWeather(data: any): { [key: string]: any } {
  let { timezone, daily, hourly } = data;
  daily = daily?.slice(1, 6).map((d : any) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly?.slice(1, 6).map((d : any) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, hourly, daily };
}

const iconUrlFromCode = (code : any) => {
  return `http://openweathermap.org/img/wn/${code}@2x.png`;
};

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
