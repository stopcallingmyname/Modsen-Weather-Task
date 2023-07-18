import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorComponent } from 'src/app/components/global-error-component/global-error.component';
import { NavbarComponent } from 'src/app/components/navbar-component/navbar.component';
import { TimeDateWidgetComponent } from 'src/app/components/time-date-component/time-date.component';
import { WeatherComponent } from 'src/app/components/weather-component/weather.component';
import { AddressInputComponent } from '../components/address-input/address-input.component';
import { HourlyForecastComponent } from '../components/hourly-forecast/hourly-forecast.component';
import { WeeklyForecastComponent } from '../components/weekly-forecast/weekly-forecast.component';
import { TodayWeatherComponent } from '../components/today-weather/today-weather.component';
import { EventsComponent } from '../components/events/events.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    TimeDateWidgetComponent,
    AddressInputComponent,
    TodayWeatherComponent,
    HourlyForecastComponent,
    WeeklyForecastComponent,
    NavbarComponent,
    GlobalErrorComponent,
  ],
  declarations: [
    TimeDateWidgetComponent,
    AddressInputComponent,
    TodayWeatherComponent,
    HourlyForecastComponent,
    WeeklyForecastComponent,
    NavbarComponent,
    GlobalErrorComponent,
  ],
})
export class SharedModule {}
