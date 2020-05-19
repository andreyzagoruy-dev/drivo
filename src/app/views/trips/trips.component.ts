import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';
import { StorageService } from '@app/services/storage.service';
import { Subscription } from 'rxjs';
import { Trip } from '@models/trip';
import { User } from '@models/user';
import { getPrettyTime } from '@app/helpers/date';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit, OnDestroy {
  public trips: Trip[];
  public activeTrip: Trip;
  public user: User;
  public getTime = getPrettyTime;
  private activeTripSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private storage: StorageService
  ) {
    this.onActiveTripChange = this.onActiveTripChange.bind(this);
  }

  ngOnInit() {
    this.user = this.route.snapshot.data.userProfile;
    this.activeTripSubscription = this.storage.getItem('activeTrip')
      .subscribe(this.onActiveTripChange);
  }

  ngOnDestroy() {
    this.activeTripSubscription.unsubscribe();
  }

  public isTripOwner(trip: Trip): boolean {
    return Number(trip.driverId) === Number(this.user.id);
  }

  public subscribeToTrip(trip: Trip): void {
    this.api.tripSubscribe(trip.id, { id: this.user.id, waypoint: trip.waypoint })
      .subscribe((subscribedTrip) => {
        this.storage.setItem('activeTrip', subscribedTrip);
      });
  }

  public unsubscribeFromTrip(trip: Trip): void {
    this.api.tripUnsubscribe(trip, this.user.id)
      .subscribe(() => {
        this.storage.setItem('activeTrip', null);
      });
  }

  public deleteTrip(trip: Trip): void {
    this.api.removeTrip(trip.id)
      .subscribe(() => {
        this.storage.setItem('activeTrip', null);
      });
  }

  private onActiveTripChange(incomingTrip: Trip): void {
    this.activeTrip = incomingTrip;

    if (!this.activeTrip) {
      this.fetchTrips();
    }
  }

  private fetchTrips(): void {
    this.api.getSuggestedTrips(this.user.workLocation, this.user.homeLocation)
      .subscribe((tripsFromServer) => {
        this.trips = tripsFromServer;
      });
  }
}
