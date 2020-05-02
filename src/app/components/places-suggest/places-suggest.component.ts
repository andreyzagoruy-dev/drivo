import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlacesGeocodeService } from '@services/places-geocode.service';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-places-suggest',
  templateUrl: './places-suggest.component.html',
  styleUrls: ['./places-suggest.component.scss']
})
export class PlacesSuggestComponent implements OnInit {
  public address = false;
  public searchQuery = new FormControl('');

  public suggestedPlaces = [];

  @Output() addLocation = new EventEmitter<any>();

  constructor(private placesGeocode: PlacesGeocodeService) { }

  ngOnInit() {
    this.searchQuery.valueChanges
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
    if (place.address.houseNumber) {
      this.searchQuery.setValue(`${place.address.street}, ${place.address.houseNumber}, ${place.address.city}`, {
        emitEvent: false
      });
      this.addLocation.emit(place.position);
      this.address = true;
    } else {
      this.searchQuery.setValue(`${place.address.city}, ${place.address.street},`);
    }
  }
}
