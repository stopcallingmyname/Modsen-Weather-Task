import { Component, OnInit } from '@angular/core';
import { GeoLocationService } from 'src/app/services/geo-location-service.service';
import { OpenWeatherService } from 'src/app/services/open-weather.service';
import { StormglassWeatherService } from 'src/app/services/stormglass-weather.service';
import { IAddress } from 'src/app/types/address.interface';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {
  coordinates: GeolocationCoordinates;
  address: IAddress;
  weatherData: any;

  constructor(
    private geolocationService: GeoLocationService,
    private openWeatherService: OpenWeatherService,
    private stormglassService: StormglassWeatherService
  ) {}

  ngOnInit(): void {
    this.getMyLocation();
    // console.log(this.coordinates.latitude, ' ', this.coordinates.longitude);
  }

  getMyLocation(): void {
    this.geolocationService
      .getGeolocation()
      .then((coordinates) => {
        this.coordinates = coordinates;
        this.geolocationService.getAddress(coordinates).subscribe({
          next: (address: IAddress) => {
            this.address = address;
            this.fetchWeather(address.city);
            this.fetchWeatherStormglass(coordinates);
          },
          error: (error: any) => {
            // Handle the error
            console.error(error);
          },
        });
      })
      .catch((error) => console.error('Error getting geolocation:', error));
  }

  fetchWeather(cityName: string): void {
    this.openWeatherService.getWeather(cityName).subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: (error) => console.log(error.message),
      complete: () => console.info('API call completed'),
    });
  }

  fetchWeatherStormglass(coordinates: GeolocationCoordinates): void {
    this.stormglassService
      .getWeather(coordinates.latitude, coordinates.longitude)
      .subscribe({
        next: (data) => {
          console.log(data);
          // this.weatherData = data;
        },
        error: (error) => console.log(error.message),
        complete: () => console.info('API call completed'),
      });
  }

  redirectToGoogleMaps(): void {
    this.geolocationService
      .getGeolocation()
      .then((coordinates) => {
        const url = `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`;
        window.location.href = url;
      })
      .catch((error) =>
        console.error('Failed to retrieve geolocation:', error)
      );
  }
}
