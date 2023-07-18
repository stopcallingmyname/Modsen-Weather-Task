import { Component, Input } from '@angular/core';
import { IWeather, IWeatherData } from '../weather-component/weather.interface';

@Component({
  selector: 'app-today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.scss'],
})
export class TodayWeatherComponent {
  @Input() todayWeatherData: IWeather;

  constructor() {}
}
