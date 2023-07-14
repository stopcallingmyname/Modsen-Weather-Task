import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { IAddress } from '../types/address.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
    private configService: ConfigService
  ) {}

  getGeolocation(): Observable<GeolocationCoordinates> {
    return new Observable<GeolocationCoordinates>((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position.coords);
            observer.complete();
          },
          (error) => {
            observer.error(error.message);
          }
        );
      } else {
        observer.error(
          new Error('Geolocation is not supported by this browser.')
        );
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorService.errorHandler(error);
      })
    );
  }

  reverseGeocode(coordinates: GeolocationCoordinates): Observable<IAddress> {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json&accept-language=en`;

    return this.http.get<any>(apiUrl).pipe(
      map((response) => {
        if (response && response.address) {
          return response.address;
        } else {
          throw new Error('Invalid response format');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return this.errorService.errorHandler(error);
      })
    );
  }

  getCityCoordinates(city: string): Observable<{ lat: number; lng: number }> {
    const url = `${this.configService.openCageUrl}?q=${encodeURIComponent(
      city
    )}&key=${this.configService.openCageApiKey}`;

    return this.http.get<any>(url).pipe(
      map((response: any) => {
        const results = response.results;
        if (results.length > 0) {
          const { lat, lng } = results[0].geometry;
          return { lat, lng };
        } else {
          throw new Error('No results found');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return this.errorService.errorHandler(error);
      })
    );
  }
}
