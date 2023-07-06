import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { ErrorService } from 'src/app/services/error.service';
import { GeoLocationService } from 'src/app/services/geo-location-service.service';
import { OpenWeatherService } from 'src/app/services/open-weather.service';
import { StormglassWeatherService } from 'src/app/services/stormglass-weather.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ConfigService,
        ErrorService,
        OpenWeatherService,
        StormglassWeatherService,
        GeoLocationService,
      ],
    };
  }
}
