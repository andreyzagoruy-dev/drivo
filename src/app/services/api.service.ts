import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '@models/user';
import { Passanger } from '@app/models/passanger';
import { Car } from '@models/car';
import { Trip } from '@app/models/trip';
import { LatLng } from '@models/map';

const API_BASE_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${API_BASE_URL}/users/${id}`);
  }

  public getCars(userId: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${API_BASE_URL}/users/${userId}/cars`);
  }

  public addCar(userId: number, car: Car): Observable<void> {
    return this.http.post<void>(`${API_BASE_URL}/users/${userId}/cars`, car);
  }

  public removeCar(userId: number, car: Car): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/users/${userId}/cars/${car.id}`);
  }

  public getRoute(start: LatLng, end: LatLng): Observable<LatLng[]> {
    const requestParamenters = 'mode=fastest;car;traffic:enabled&routeattributes=sh&departure=now';

    return this.http.get<LatLng[]>(`${API_BASE_URL}/routes/?waypoint0=${start[0]},${start[1]}&waypoint1=${end[0]},${end[1]}&${requestParamenters}`);
  }

  public addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${API_BASE_URL}/trips`, trip)
      .pipe(
        map((createdTrip) => {
          createdTrip.departureTime = new Date(createdTrip.departureTime);
          return createdTrip;
        })
      );
  }

  public removeTrip(tripId: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/trips/${tripId}`);
  }

  public tripSubscribe(tripId: number, passanger: Passanger): Observable<Trip> {
    return this.http.post<Trip>(`${API_BASE_URL}/trips/${tripId}/subscribe`, passanger);
  }

  public tripUnsubscribe(tripId: number, passangerId: number): Observable<void> {
    return this.http.post<void>(`${API_BASE_URL}/trips/${tripId}/unsubscribe`, { passangerId });
  }

  public getActiveTrip(userId: number): Observable<Trip> {
    return this.http.get<Trip>(`${API_BASE_URL}/users/${userId}/trips/active`)
      .pipe(
        map((trip) => {
          if (trip) {
            trip.departureTime = new Date(trip.departureTime);
          }
          return trip;
        })
      );
  }

  public getSuggestedTrips(start: LatLng, finish: LatLng, distance = 1250): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${API_BASE_URL}/trips/?start=${start[0]},${start[1]}&finish=${finish[0]},${finish[1]}&distance=${distance}`)
      .pipe(
        map((trips) => trips.map((trip) => {
          trip.departureTime = new Date(trip.departureTime);
          return trip;
        }))
      );
  }

  public addUser(email: string, password: string): Observable<User> {
    const body = {
      email,
      password
    };

    return this.http.post<User>(`${API_BASE_URL}/users/`, body);
  }

  public updateProfile(userProfile: User, id: number): Observable<User> {
    return this.http.put<User>(`${API_BASE_URL}/users/${id}`, userProfile);
  }
}
