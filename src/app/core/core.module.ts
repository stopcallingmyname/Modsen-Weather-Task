import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { ErrorService } from 'src/app/services/error.service';
import { WeatherService } from 'src/app/services/weather.service';
import { GeoLocationService } from 'src/app/services/geo-location-service.service';

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
        GeoLocationService,
        WeatherService,
      ],
    };
  }
}
