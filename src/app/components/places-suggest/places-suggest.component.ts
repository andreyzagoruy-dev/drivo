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

  @ContentChild(InputListenerDirective) input: InputListenerDirective;
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
        this.suggestedPlaces = places.items;
        this.isShowSuggestions = !!places.items.length && this.input.focus.getValue();
      });

    this.input.focus
      .subscribe((focusState) => {
        this.isShowSuggestions = focusState && this.suggestedPlaces.length !== 0;
      });
  }

  public setPlace(place: HereMapsPlace): void {
    this.addLocation.emit({ ...place, prettyAddress: this.getPrettyAddress(place) });
  }

  public getPrettyAddress(place: HereMapsPlace): string {
    const { street, houseNumber, city, countryName } = place.address;
    return `${street ? street + ',' : ''}
            ${houseNumber ? houseNumber + ',' : ''}
            ${city ? city + ',' : ''}
            ${countryName}`
      .replace(/\n(\s+)/gm, ' ');
  }
}
