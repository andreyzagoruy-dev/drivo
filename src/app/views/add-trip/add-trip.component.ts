import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LatLng } from '@app/models/map';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  public tripRoute: LatLng[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tripRoute = this.route.snapshot.data.tripRoute;
  }
}
