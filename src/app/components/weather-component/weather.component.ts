import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, pluck } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { GeoLocationService } from 'src/app/services/geo-location-service.service';
import { WeatherService } from 'src/app/services/weather.service';
import { IAddress } from 'src/app/types/address.interface';
import { IWeather, IWeatherData } from './weather.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  address: IAddress;
  todayWeatherData: IWeather;
  timeline: { time: any; temp: number; icon: string }[] = [];
  weeklyTimeline: any = [];
  city: { lat: number; lon: number };

  constructor(
    private geolocationService: GeoLocationService,
    private weatherService: WeatherService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.fetchGeolocation();
  }

  ngAfterViewInit(): void {}

  onInputValueChanged(): void {
    this.geolocationService
      .getCityCoordinates(this.address.city)
      .subscribe((data) => {
        this.fetchTodayWeather(data.lat, data.lng);
        this.fetchCityNameByLocation(data.lat, data.lng);
        this.fetchWeatherForecast(data.lat, data.lng);
      });
  }

  fetchGeolocation(): void {
    this.geolocationService
      .getGeolocation()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.errorHandler(error);
        })
      )
      .subscribe((coordinates) => {
        this.fetchTodayWeather(coordinates.latitude, coordinates.longitude);
        this.fetchWeatherForecast(coordinates.latitude, coordinates.longitude);
        this.fetchCityNameByLocation(
          coordinates.latitude,
          coordinates.longitude
        );
      });
  }

  // fetchCityLocationByName(city: string): void {
  //   this.geolocationService.getCityCoordinates(city).subscribe((data) => {
  //   });
  // }

  fetchWeatherForecast(lat: number, lon: number): void {
    this.weatherService
      .getWeatherForecast(lat, lon)
      .pipe(
        pluck('list'),
        catchError((error: HttpErrorResponse) => {
          return this.errorService.errorHandler(error);
        })
      )
      .subscribe((data) => {
        this.fetchTodayForecast(data);
        this.fetchWeeklyForecast(data);
      });
  }

  fetchTodayForecast(today: any): void {
    this.timeline = [];

    for (const forecast of today.slice(0, 8)) {
      this.timeline.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp,
        icon: forecast.weather[0].icon,
      });
    }

    // for (const forecast of today.list.slice(0, 8)) {
    //   this.timeline.push({
    //     time: forecast.dt_txt,
    //     temp: forecast.main.temp,
    //     icon: forecast.weather[0].icon,
    //   });
    // }
  }

  fetchWeeklyForecast(data: any) {
    this.weeklyTimeline = [];
    for (let i = 0; i < data.length; i = i + 8) {
      this.weeklyTimeline.push(data[i]);
    }
  }

  fetchTodayWeather(lat: number, lon: number): void {
    this.weatherService
      .getCurrentWeather(lat, lon)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.errorHandler(error);
        })
      )
      .subscribe((data: IWeatherData) => {
        this.todayWeatherData = data.data[0];
      });
  }

  getObjectKeys(obj: any): { key: string; value: any }[] {
    return Object.keys(obj).map((key) => ({ key, value: obj[key] }));
  }

  fetchCityNameByLocation(lat: number, lon: number): void {
    this.geolocationService
      .reverseGeocode(lat, lon)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.errorHandler(error);
        })
      )
      .subscribe((address: IAddress) => {
        this.address = address;
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
}
