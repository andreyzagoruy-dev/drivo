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

  public searchQuery = new FormControl('');

  public suggestedPlaces = [];

  @Output() addLocation = new EventEmitter<any>();
    setPlace(place: any) {
      this.addLocation.emit(place.position);
      // console.log(this.location);
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


}
