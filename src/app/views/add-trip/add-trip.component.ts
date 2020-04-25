import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';
import { Trip } from '@app/models/trip';
import { Car } from '@app/models/car';
import { User } from '@app/models/user';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  public user: User;
  public cars: Car[] = [];
  public dates: Date[] = [];
  public trip: Trip;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.userProfile;
    this.trip = {
      driverId: this.user.id,
      departureTime: null,
      start: this.user.workLocation,
      seatsTotal: 3,
      car: null,
      route: this.route.snapshot.data.tripRoute
    };
    this.fetchCars();
    this.generateDates();
  }

  public addTrip(): void {
    this.api.addTrip(this.trip)
      .subscribe((response) => {
        console.log('Trip:', response);
      });
  }

  private generateDates(): void {
    const currentDate = new Date();
    let currentHour = currentDate.getHours();

    while (currentHour !== 24) {
      currentHour += 1;
      currentDate.setHours(currentHour);
      currentDate.setMinutes(0, 0, 0);
      this.dates.push(new Date(currentDate));
    }
  }

  private fetchCars(): void {
    this.api.getCars(this.user.id)
      .subscribe((carsFromServer) => {
        this.cars = carsFromServer;
      });
  }
}
