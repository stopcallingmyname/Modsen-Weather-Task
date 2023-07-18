import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {} from '@angular/google-maps';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
})
export class AddressInputComponent implements OnInit, AfterViewInit {
  @ViewChild('inputField', { static: true })
  inputRef: ElementRef<HTMLInputElement>;
  @Input() value: string;
  @Input() placeholder: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  ngOnInit() {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputRef.nativeElement
    );
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      if (place && place.address_components) {
        const city = place.address_components.find((component) =>
          component.types.includes('locality')
        );
        if (city) {
          this.value = city.long_name;
          this.valueChange.emit(this.value);
        }
      }
    });
  }
}
