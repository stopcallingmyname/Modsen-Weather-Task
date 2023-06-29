import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GlobalErrorComponent } from './widgets/global-error/global-error.component';
import { WeatherWidgetComponent } from './widgets/weather-widget/weather-widget.component';
import { TimeDateWidgetComponent } from './widgets/time-date-widget/time-date-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    GlobalErrorComponent,
    WeatherWidgetComponent,
    TimeDateWidgetComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
