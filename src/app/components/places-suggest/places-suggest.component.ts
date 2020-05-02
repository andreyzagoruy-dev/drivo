import { Component, EventEmitter, Output, ContentChild, AfterContentInit } from '@angular/core';
import { PlacesGeocodeService } from '@services/places-geocode.service';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { InputListenerDirective } from '@directives/input-listener.directive';
import { HereMapsPlace } from '@models/map';

@Component({
  selector: 'app-places-suggest',
  templateUrl: './places-suggest.component.html',
  styleUrls: ['./places-suggest.component.scss']
})
export class PlacesSuggestComponent implements AfterContentInit {
  public isShowSuggestions = false;
  public suggestedPlaces: HereMapsPlace[] = [];

  @ContentChild(InputListenerDirective, { static: false }) input: InputListenerDirective;
  @Output() addLocation = new EventEmitter<HereMapsPlace>();

  constructor(private placesGeocode: PlacesGeocodeService) { }

  ngAfterContentInit() {
    this.input.changes
      .pipe(
        filter((inputValue) => !!inputValue.length),
        debounceTime(1500),
        switchMap((inputValue) => this.placesGeocode.suggest(inputValue))
      )
      .subscribe((places) => {
        this.isShowSuggestions = true;
        this.suggestedPlaces = places.items;
      });
  }

  public setPlace(place: HereMapsPlace): void {
    this.addLocation.emit({ ...place, prettyAddress: this.getPrettyAddress(place) });
    this.isShowSuggestions = false;
  }

  public getPrettyAddress(place: HereMapsPlace): string {
    return `${place.address.street},
            ${place.address.houseNumber ? place.address.houseNumber + ',' : ''}
            ${place.address.city},
            ${place.address.countryName}`
      .replace(/\n(\s+)/gm, ' ');
  }
}
