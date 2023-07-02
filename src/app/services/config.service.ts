import { Injectable } from '@angular/core';
import { environment } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  get openWeatherApiKey(): string {
    return environment.openWeatherApiKey;
  }

  get stormglassApiKey(): string {
    return environment.stormglassApiKey;
  }
}
