import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { ErrorService } from './error.service';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StormglassWeatherService {
  private apiKey: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private errorService: ErrorService
  ) {
    this.apiKey = this.configService.stormglassApiKey;
  }

  getWeather(lat: number, lng: number): Observable<any> {
    const params = 'windSpeed';

    return this.http
      .get<any>(
        `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`,
        {
          headers: {
            Authorization: this.apiKey,
          },
        }
      )
      .pipe(
        map((response) => {
          if (response.hours) {
            return response.hours[0].waterTemperature;
          } else {
            throw new Error('Invalid weather data');
          }
        }),
        catchError((error: HttpErrorResponse) => this.errorHandler(error))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
