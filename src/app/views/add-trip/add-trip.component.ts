import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.generateDates();
  }

  public addTrip(): void {
    this.api.addTrip(this.trip)
      .subscribe((response) => {
        console.log('Trip:', response);
        this.router.navigate(['/trips']);
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
}
