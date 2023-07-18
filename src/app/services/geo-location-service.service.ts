import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { IAddress } from '../types/address.interface';
import { environment } from 'src/config';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  private readonly CURRENT_LOCATION_CACHE_KEY: string = 'curr_location_data';

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
    private cacheService: CacheService
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

  // reverseGeocode(lat: number, lon: number): Observable<IAddress> {
  //   const params = new HttpParams()
  //     .set('lat', lat.toString())
  //     .set('lon', lon.toString())
  //     .set('format', 'json')
  //     .set('accept-language', 'en');
  //   return this.http.get<any>(environment.OPENSTREETMAP_URL, { params }).pipe(
  //     map((response) => {
  //       if (response && response.address) {
  //         return response.address;
  //       } else {
  //         throw new Error('Invalid response format');
  //       }
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       return this.errorService.errorHandler(error);
  //     })
  //   );
  // }

  reverseGeocode(lat: number, lon: number): Observable<IAddress> {
    const cachedData = this.cacheService.getCachedData(
      this.CURRENT_LOCATION_CACHE_KEY,
      lat,
      lon
    );

    if (cachedData && !this.cacheService.isDataExpired(cachedData)) {
      console.log('Retrieving selected city data from cache..');
      return of(cachedData.data);
    }

    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('format', 'json')
      .set('accept-language', 'en');

    console.log('Fetching selected city data from API..');
    return this.http.get<any>(environment.OPENSTREETMAP_URL, { params }).pipe(
      map((response) => {
        if (response && response.address) {
          const data = response.address;
          console.log('Caching selected city data..');
          this.cacheService.cacheData(
            this.CURRENT_LOCATION_CACHE_KEY,
            lat,
            lon,
            data
          );
          return data;
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
    const url = `${environment.OPEN_CAGE_URL}?q=${encodeURIComponent(
      city
    )}&key=${environment.OPEN_CAGE_API_KEY}`;

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
