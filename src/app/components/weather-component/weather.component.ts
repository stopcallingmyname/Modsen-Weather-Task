import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, pipe } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { GeoLocationService } from 'src/app/services/geo-location-service.service';
import { WeatherService } from 'src/app/services/weather.service';
import { IAddress } from 'src/app/types/address.interface';
import { IWeather } from './weather.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  coordinates: GeolocationCoordinates;
  address: IAddress;
  weatherData: IWeather;
  timeline: { time: any; temp: number; icon: string }[] = [];
  city: { lat: number; lon: number };

  constructor(
    private geolocationService: GeoLocationService,
    private weatherService: WeatherService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchCityLocation(city: string): void {
    this.geolocationService.getCityCoordinates(city).subscribe((data) => {
      console.log('Forward geocoding: ', data);
    });
  }

  fetchTodayForecast(today: any): void {
    for (const forecast of today.list.slice(0, 8)) {
      this.timeline.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp,
        icon: forecast.weather[0].icon,
      });

      const apiDate = new Date(forecast.dt_txt).getTime();
      if (this.isWithinDateRange(apiDate)) this.setWeatherData(forecast);
    }
  }

  fetchTodayWeather(coordinates: GeolocationCoordinates): void {
    this.weatherService
      .getWeather(coordinates.latitude, coordinates.longitude)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.errorHandler(error);
        })
      )
      .subscribe((data: any) => {
        const { humidity, gust, windSpeed, visibility } = data;
        this.weatherData = {
          ...this.weatherData,
          humidity: humidity,
          gust: gust,
          wind_speed: windSpeed,
          visibility: visibility,
        };
      });
  }

  fetchData(): void {
    this.geolocationService.getGeolocation().subscribe((coordinates) => {
      console.log(coordinates);
      this.coordinates = coordinates;
      this.weatherService
        .getWeatherForecast(coordinates.latitude, coordinates.longitude)
        .subscribe((data) => {
          this.fetchTodayForecast(data);
        });
      // this.weatherService
      //   .getWeather(coordinates.latitude, coordinates.longitude)
      //   .subscribe((data) => {
      //     console.log('TODAY: ', data);
      //   });
      this.geolocationService.reverseGeocode(coordinates).subscribe({
        next: (address: IAddress) => {
          this.address = address;
          this.fetchCityLocation(address.city);
        },
      }),
        pipe(
          catchError((error: HttpErrorResponse) => {
            return this.errorService.errorHandler(error);
          })
        );
    });
  }

  // redirectToGoogleMaps(): void {
  //   this.geolocationService
  //     .getGeolocation()
  //     .then((coordinates) => {
  //       const url = `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`;
  //       window.location.href = url;
  //     })
  //     .catch((error) =>
  //       console.error('Failed to retrieve geolocation:', error)
  //     );
  // }

  dateRange() {
    const start = new Date();
    start.setHours(start.getHours() + start.getTimezoneOffset() / 60);
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return { start, to };
  }

  isWithinDateRange(apiDate: number): boolean {
    const startDate = this.dateRange().start.getTime();
    const endDate = this.dateRange().to.getTime();
    return startDate <= apiDate && endDate >= apiDate;
  }

  setWeatherData(forecast: any): void {
    const { icon, main, description } = forecast.weather[0];
    const { temp, feels_like } = forecast.main;

    this.weatherData = {
      icon: icon,
      temperature: Number(temp),
      feels_like: Number(feels_like),
      weather: main,
      description: description,
      humidity: 0,
      gust: 0,
      wind_speed: 0,
      visibility: 0,
      astronomy: {
        sunrise: '',
        sunset: '',
      },
    };
  }
}
