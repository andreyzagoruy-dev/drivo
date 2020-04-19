import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';
import { Trip } from '@models/trip';
import { User } from '@models/user';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  trips: Trip[];
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.userProfile;
    this._fetchTrips();
  }

  private _fetchTrips(): void {
    this.api.getSuggestedTrips([
        this.user.homeLatitude,
        this.user.homeLongitude
      ])
      .subscribe((tripsFromServer) => {
        this.trips = tripsFromServer;
      });
  }

  public addTrip() {
    this.router.navigate(['trips/add']);
  }

}
