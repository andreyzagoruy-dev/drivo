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
  public trips: Trip[];
  public user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.userProfile;
    this.fetchTrips();
  }

  public subscribeToTrip(trip: Trip): void {
    this.api.tripSubscribe(
      trip.id,
      {
        id: this.user.id,
        waypoint: trip.waypoint
      }
    )
      .subscribe((subscribed) => {
        console.log('Subscribed', subscribed);
      });
  }

  private fetchTrips(): void {
    this.api.getSuggestedTrips(this.user.homeLocation)
      .subscribe((tripsFromServer) => {
        this.trips = tripsFromServer;
        console.log('Trips:', tripsFromServer);
        
      });
  }
}
