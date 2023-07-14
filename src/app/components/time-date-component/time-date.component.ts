import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-date',
  templateUrl: './time-date.component.html',
  styleUrls: ['./time-date.component.scss'],
})
export class TimeDateWidgetComponent implements OnInit {
  currentTime: string;
  currentDate: string;

  ngOnInit() {
    this.updateTimeAndDate();
    setInterval(() => this.updateTimeAndDate(), 1000);
  }

  private updateTimeAndDate() {
    const currentDateObj = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    this.currentDate = currentDateObj.toLocaleDateString('en-US', options);
    this.currentTime = currentDateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }
}
