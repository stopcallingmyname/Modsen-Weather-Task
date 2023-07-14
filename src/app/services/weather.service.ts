import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ConfigService } from './config.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  getWeatherForecast(lat: number, lon: number): Observable<Object> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('units', 'metric')
      .set('appid', this.configService.openWeatherApiKey);

    return this.http.get(this.configService.openWeatherUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorService.errorHandler(error);
      })
    );
  }

  getWeather(lat: number, lng: number): Observable<Object> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lng', lng.toString())
      .set('params', 'humidity,gust,visibility');

    const headers = new HttpHeaders().set(
      'Authorization',
      this.configService.stormglassApiKey
    );

    return this.http
      .get(this.configService.stormglassUrl, { params, headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorService.errorHandler(error);
        })
      );
  }
}
