import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorComponent } from 'src/app/widgets/global-error/global-error.component';
import { NavbarComponent } from 'src/app/widgets/navbar/navbar.component';
import { TimeDateWidgetComponent } from 'src/app/widgets/time-date-widget/time-date-widget.component';
import { WeatherWidgetComponent } from 'src/app/widgets/weather-widget/weather-widget.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    WeatherWidgetComponent,
    TimeDateWidgetComponent,
    NavbarComponent,
    GlobalErrorComponent,
  ],
  declarations: [
    WeatherWidgetComponent,
    TimeDateWidgetComponent,
    NavbarComponent,
    GlobalErrorComponent,
  ],
})
export class SharedModule {}
