import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { StorageService } from '@app/services/storage.service';
import { Trip } from '@app/models/trip';
import { Car } from '@app/models/car';
import { User } from '@app/models/user';
import { HereMapsPlace, LatLng } from '@models/map';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  public user: User = this.route.snapshot.data.userProfile;
  public cars: Car[] = this.route.snapshot.data.cars;
  public dates: Date[] = [];
  public trip: Trip = {
    driverId: this.user.id,
    departureTime: null,
    start: this.user.workLocation,
    seatsTotal: null,
    car: null,
    route: this.route.snapshot.data.tripRoute
  };

  public startAddress: string;
  public startLocation: LatLng;
  public finishAddress: string;
  public finishLocation: LatLng;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    const { homeAddress, homeLocation, workAddress, workLocation } = this.user;

    this.startAddress = workAddress;
    this.startLocation = workLocation;
    this.finishAddress = homeAddress;
    this.finishLocation = homeLocation;

    this.generateDates();
  }

  public addTrip(): void {
    this.api.addTrip(this.trip)
      .subscribe((createdTrip) => {
        this.storage.setItem('activeTrip', createdTrip);
        this.router.navigate(['/trips']);
      });
  }

  public setLocation(type: 'start' | 'finish', place: HereMapsPlace): void {
    const { prettyAddress, position: { lat, lng } } = place;
    this[`${type}Address`] = prettyAddress;
    this[`${type}Location`] = [lat, lng];
    this.calculateTripRoute();
  }

  private calculateTripRoute() {
    this.api.getRoute(this.startLocation, this.finishLocation)
      .subscribe((calculatedRoute) => {
        this.trip = { ...this.trip, route: calculatedRoute, start: this.startLocation };
      });
  }

  private generateDates(): void {
    const currentDate = new Date();
    let currentHour = currentDate.getHours();

    while (currentHour !== 23) {
      currentHour += 1;
      currentDate.setHours(currentHour);
      currentDate.setMinutes(0, 0, 0);
      this.dates.push(new Date(currentDate));
    }
  }
}
