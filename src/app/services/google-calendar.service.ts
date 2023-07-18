import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private readonly API_KEY = 'AIzaSyDhtM_3WRTBIi317-9OZc6cWu9Uc_cZF2E'; // Replace with your actual API key from the Google Cloud Console
  private readonly DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  private readonly SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  constructor(private http: HttpClient) {}

  initGoogleClient(): Observable<void> {
    return new Observable<void>((observer) => {
      gapi.load('client', () => {
        gapi.client
          .init({
            apiKey: this.API_KEY,
            discoveryDocs: this.DISCOVERY_DOCS,
            scope: this.SCOPES,
          })
          .then(() => {
            observer.next();
            observer.complete();
          })
          .catch((error: any) => {
            observer.error(error);
          });
      });
    });
  }

  getEvents(calendarId: string, timeMin: string): Observable<any> {
    return this.http.get<any>(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      {
        params: {
          timeMin,
          showDeleted: 'false',
          singleEvents: 'true',
          orderBy: 'startTime',
        },
      }
    );
  }

  // async getCalendars() {
  //   const auth = await this.getAuthenticatedClient();
  //   const calendar = google.calendar({ version: 'v3', auth });
  //   const response = await calendar.calendarList.list();
  //   const calendars = response.data.items;
  //   console.log(calendars);
  //   return calendars;
  // }
}
