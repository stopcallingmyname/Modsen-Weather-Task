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

  get openCageApiKey(): string {
    return environment.openCageApiKey;
  }

  get openWeatherUrl(): string {
    return environment.openWeatherUrl;
  }

  get stormglassUrl(): string {
    return environment.stormglassUrl;
  }

  get openCageUrl(): string {
    return environment.openCageUrl;
  }
}
