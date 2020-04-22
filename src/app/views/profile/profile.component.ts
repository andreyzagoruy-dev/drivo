import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';
import { StorageService } from '@services/storage.service';
import { User } from '@models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(
    private api: ApiService,
    private storage: StorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.userProfile;
  }

  workLocation(location) {
    this.user.workLatitude = location.lat;
    this.user.workLongitude = location.lng;
  }

  homeLocation(location) {
    this.user.homeLatitude = location.lat;
    this.user.homeLongitude = location.lng;
  }

  onSubmit() {
    this.api.updateProfile(this.user, this.user.id).subscribe((data) => {
      this.storage.setItem('userProfile', this.user);
      console.log(data);
    });
  }

}
