import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorComponent } from 'src/app/components/global-error-component/global-error.component';
import { NavbarComponent } from 'src/app/components/navbar-component/navbar.component';
import { TimeDateWidgetComponent } from 'src/app/components/time-date-component/time-date.component';
import { WeatherComponent } from 'src/app/components/weather-component/weather.component';
import { AddressInputComponent } from '../components/address-input/address-input.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    WeatherComponent,
    TimeDateWidgetComponent,

    AddressInputComponent,
    NavbarComponent,
    GlobalErrorComponent,
  ],
  declarations: [
    WeatherComponent,
    TimeDateWidgetComponent,
    AddressInputComponent,
    NavbarComponent,
    GlobalErrorComponent,
  ],
})
export class SharedModule {}
