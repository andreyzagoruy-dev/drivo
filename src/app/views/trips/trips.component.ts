import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';
import { StorageService } from '@app/services/storage.service';
import { Subscription } from 'rxjs';
import { Trip } from '@models/trip';
import { User } from '@models/user';
import { HereMapsPlace, LatLng } from '@models/map';
import { getPrettyTime } from '@app/helpers/date';

const WALK_DISTANCE_IN_METERS_PER_MINUTE = 80;

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit, OnDestroy {
  public trips: Trip[];
  public activeTrip: Trip;
  public user: User = this.route.snapshot.data.userProfile;

  public startAddress: string;
  public startLocation: LatLng;
  public finishAddress: string;
  public finishLocation: LatLng;
  public walkTimeInMinutes = 15;
  public mapFinishLocation: LatLng;

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
    const { homeAddress, homeLocation, workAddress, workLocation } = this.user;

    this.startAddress = workAddress;
    this.startLocation = workLocation;
    this.finishAddress = homeAddress;
    this.finishLocation = homeLocation;
    this.mapFinishLocation = homeLocation;

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

  public setLocation(type: 'start' | 'finish', place: HereMapsPlace): void {
    const { prettyAddress, position: { lat, lng } } = place;
    this[`${type}Address`] = prettyAddress;
    this[`${type}Location`] = [lat, lng];
  }

  public isSearchFormValid(): boolean {
    const { startLocation, finishLocation } = this;
    const isStartLocation = !!startLocation.filter((coordinate) => coordinate !== 0).length;
    const isFinishLocation = !!finishLocation.filter((coordinate) => coordinate !== 0).length;

    return isStartLocation && isFinishLocation;
  }

  public fetchTrips(): void {
    const distance = this.walkTimeInMinutes * WALK_DISTANCE_IN_METERS_PER_MINUTE;

    this.api.getSuggestedTrips(this.startLocation, this.finishLocation, distance)
      .subscribe((tripsFromServer) => {
        this.trips = tripsFromServer;
      });

    this.mapFinishLocation = [this.finishLocation[0], this.finishLocation[1]];
  }

  public isNoTrips(): boolean {
    return this.trips.length === 0;
  }

  private onActiveTripChange(incomingTrip: Trip): void {
    this.activeTrip = incomingTrip;

    if (!this.activeTrip) {
      this.fetchTrips();
    }
  }
}
