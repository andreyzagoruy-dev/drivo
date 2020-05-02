import { Component, EventEmitter, Output, ContentChild, AfterContentInit } from '@angular/core';
import { PlacesGeocodeService } from '@services/places-geocode.service';
import { debounceTime, filter } from 'rxjs/operators';
import { InputListenerDirective } from '@app/directives/input-listener.directive';

@Component({
  selector: 'app-places-suggest',
  templateUrl: './places-suggest.component.html',
  styleUrls: ['./places-suggest.component.scss']
})
export class PlacesSuggestComponent implements AfterContentInit {
  public address = false;
  public suggestedPlaces = [];

  @ContentChild(InputListenerDirective, { static: false }) input: InputListenerDirective;
  @Output() addLocation = new EventEmitter<any>();

  constructor(private placesGeocode: PlacesGeocodeService) { }

  ngAfterContentInit() {
    this.input.changes
      .pipe(
        filter((place) => place.length),
        debounceTime(1500)
      )
      .subscribe((address) => {
        this.placesGeocode.suggest(address).subscribe((places: any) => {
          this.address = false;
          this.suggestedPlaces = places.items;
        });
      });
  }

  setPlace(place: any) {
    this.addLocation.emit(place.position);
    this.address = true;
  }
}
