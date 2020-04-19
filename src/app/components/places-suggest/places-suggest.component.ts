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
  public address = '';

  public searchQuery = new FormControl('');

  public suggestedPlaces = [];

  @Output() addLocation = new EventEmitter<any>();
    setPlace(place: any) {
      this.showAddress(place.title);
      this.addLocation.emit(place.position);
    }

  constructor(private placesGeocode: PlacesGeocodeService) { }

  ngOnInit() {
    this.searchQuery.valueChanges
      .pipe(
        filter(place => place.length),
        debounceTime(1500)
      )
      .subscribe(address => {
      this.placesGeocode.suggest(address).subscribe((places: any) => {
        this.suggestedPlaces = places.items;
        console.log(places);
      });
    });
  }

  showAddress(place: string): boolean {
    if (place.length !== 0){
      this.address = place;
      return true;
    }
    return false;
  }

  cleanAddress(): void {
    this.address = '';
    event.preventDefault()
  }

}
