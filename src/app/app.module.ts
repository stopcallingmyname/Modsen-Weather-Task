import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { WeatherComponent } from './components/weather-component/weather.component';
import { AuthComponent } from './components/auth/auth.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: WeatherComponent },
  { path: 'events', component: EventsComponent },
  { path: '**', component: WeatherComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    EventsComponent,
    AuthComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    FormsModule,
    CoreModule.forRoot(),
    SharedModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(ROUTES),
    MatSnackBarModule,
  ],
})
export class AppModule {}
