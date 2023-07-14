import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
})
export class AddressInputComponent implements OnInit {
  @ViewChild('input', { static: true }) inputRef: ElementRef<HTMLInputElement>;
  @Input() value: string;
  @Input() placeholder: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  autocomplete: google.maps.places.Autocomplete | undefined;

  ngOnInit() {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputRef.nativeElement
    );
  }

  // private initAutocomplete(): void {
  //   const autocomplete = new google.maps.places.Autocomplete(
  //     this.inputRef.nativeElement
  //   );
  //   console.log(autocomplete);

  //   autocomplete.addListener('place_changed', () => {
  //     const place = autocomplete.getPlace();
  //     this.value = place.name || '';
  //     this.valueChange.emit(this.value);
  //   });
  // }
}
