import { ModuleWithProviders, NgModule } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [ErrorService],
    };
  }
}
