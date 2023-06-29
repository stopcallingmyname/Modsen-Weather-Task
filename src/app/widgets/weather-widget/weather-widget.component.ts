import { Component } from '@angular/core';
import { GeoLocationService } from 'src/app/services/geo-location-service.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent {
  constructor(private geolocationService: GeoLocationService) {
    this.getMyLocation();
  }

  coordinates: GeolocationCoordinates;

  getMyLocation(): void {
    this.geolocationService
      .getGeolocation()
      .then((coordinates) => {
        this.coordinates = coordinates;
        console.log(this.coordinates);
      })
      .catch((error) => console.error('Error getting geolocation:', error));
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
