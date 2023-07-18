import { Component, OnInit } from '@angular/core';
import { GoogleCalendarService } from 'src/app/services/google-calendar.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events: any[] = [];

  constructor(private googleCalendarService: GoogleCalendarService) {}

  ngOnInit() {
    // this.googleCalendarService.initGoogleClient().subscribe(() => {
    //   this.listEvents();
    // });
  }

  listEvents() {
    const calendarId = 'primary'; // You can use 'primary' for the primary calendar or specify a different calendar ID.
    const timeMin = new Date().toISOString();
    this.googleCalendarService.getEvents(calendarId, timeMin).subscribe(
      (response: any) => {
        this.events = response.items;
      },
      (error: any) => {
        console.error('Error fetching events:', error);
      }
    );
  }
}
