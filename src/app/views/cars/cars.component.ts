import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { Car } from '@app/models/car';
import { User } from '@app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  public user: User;
  public cars: Car[] = [];
  public newCar: Car = {
    model: '',
    license: ''
  };

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.userProfile;
    this.fetchCars();
  }

  public addCar(): void {
    this.api.addCar(this.user.id, this.newCar)
      .subscribe(() => {
        this.newCar.license = '';
        this.newCar.model = '';
        this.fetchCars();
      });
  }

  public removeCar(car: Car): void {
    this.api.removeCar(this.user.id, car)
      .subscribe(() => {
        this.fetchCars();
      });
  }

  private fetchCars(): void {
    this.api.getCars(this.user.id)
      .subscribe((carsFromServer) => {
        this.cars = carsFromServer;
      });
  }
}
