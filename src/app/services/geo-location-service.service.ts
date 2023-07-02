import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IAddress } from '../types/address.interface';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  constructor(private errorService: ErrorService, private http: HttpClient) {}

  getGeolocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error.message)
        );
      } else {
        reject(catchError(this.errorHandler.bind(this)));
      }
    });
  }

  getAddress(coordinates: GeolocationCoordinates): Observable<IAddress> {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json`;

    return this.http.get<any>(apiUrl).pipe(
      catchError(this.errorHandler.bind(this)),
      map((response) => {
        if (response && response.address) {
          return response.address;
        } else {
          throw new Error('Invalid response format');
        }
      })
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
