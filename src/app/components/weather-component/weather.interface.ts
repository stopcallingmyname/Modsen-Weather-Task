export interface IWeather {
  icon: any;
  temperature: number;
  feels_like: number;
  weather: string;
  description: string;
  humidity: number;
  gust: number;
  wind_speed: number;
  visibility: number;
  astronomy: {
    sunrise: string;
    sunset: string;
  };
}
