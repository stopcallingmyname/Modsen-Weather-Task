import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ErrorService } from './error.service';
import { environment } from 'src/config';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly FORECAST_CACHE_KEY: string = 'weather_forecast_data';
  private readonly CURRENT_CACHE_KEY: string = 'current_weather_data';

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private cacheService: CacheService
  ) {}

  getWeatherForecast(lat: number, lon: number): Observable<Object> {
    const cachedData = this.cacheService.getCachedData(
      this.FORECAST_CACHE_KEY,
      lat,
      lon
    );

    if (cachedData && !this.cacheService.isDataExpired(cachedData)) {
      console.log('Retrieving weather data from cache..');
      return of(cachedData.data);
    } else {
      const params = new HttpParams()
        .set('lat', lat.toString())
        .set('lon', lon.toString())
        .set('units', 'metric')
        .set('appid', environment.OPEN_WEATHER_API_KEY);

      console.log('Fetching weather data from API..');
      return this.http.get(environment.OPEN_WEATHER_URL, { params }).pipe(
        map((data) => {
          console.log('Caching weather data..');
          this.cacheService.cacheData(this.FORECAST_CACHE_KEY, lat, lon, data);
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          return this.errorService.errorHandler(error);
        })
      );
    }
  }

  getCurrentWeather(lat: number, lng: number): Observable<any> {
    const cachedData = this.cacheService.getCachedData(
      this.CURRENT_CACHE_KEY,
      lat,
      lng
    );

    if (cachedData && !this.cacheService.isDataExpired(cachedData)) {
      console.log('Retrieving weather data from cache..');
      return of(cachedData.data);
    } else {
      const params = new HttpParams()
        .set('lat', lat.toString())
        .set('lon', lng.toString())
        .set('key', environment.WEATHERBIT_API_KEY);

      const headers = new HttpHeaders();

      console.log('Fetching weather data from API..');
      return this.http
        .get(environment.WEATHERBIT_URL, { params, headers })
        .pipe(
          map((data) => {
            console.log('Caching weather data..');
            this.cacheService.cacheData(this.CURRENT_CACHE_KEY, lat, lng, data);
            return data;
          }),
          catchError((error: HttpErrorResponse) => {
            return this.errorService.errorHandler(error);
          })
        );
    }
  }

  // private getCachedData(CACHE_KEY: string, lat: number, lon: number): any {
  //   const cachedData = localStorage.getItem(CACHE_KEY);
  //   if (cachedData) {
  //     const parsedData = JSON.parse(cachedData);
  //     if (parsedData.lat === lat && parsedData.lon === lon) {
  //       return parsedData;
  //     }
  //   }
  //   return null;
  // }

  // private cacheData(
  //   CACHE_KEY: string,
  //   lat: number,
  //   lon: number,
  //   data: any
  // ): void {
  //   const cachedData = {
  //     lat: lat,
  //     lon: lon,
  //     data: data,
  //     timestamp: new Date().getTime(),
  //   };
  //   localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
  // }

  // private isDataExpired(data: any): boolean {
  //   const currentTime = new Date().getTime();
  //   const dataTimestamp = data.timestamp;
  //   // const expirationTime = 2 * 60 * 60 * 1000; // 2 hours
  //   const expirationTime = 1 * 60 * 1000; // 1 minute
  //   return currentTime - dataTimestamp > expirationTime;
  // }
}
