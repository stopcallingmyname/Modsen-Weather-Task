import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherService {
  private apiKey: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private errorService: ErrorService
  ) {
    this.apiKey = this.configService.openWeatherApiKey;
  }

  getWeather(cityName: string): Observable<any> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}`;

    return this.http.get<any>(apiUrl).pipe(
      map((response) => {
        if (response.main && response.main.temp) {
          response.main.temp = Math.round(response.main.temp - 273.15);
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => this.errorHandler(error))
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
