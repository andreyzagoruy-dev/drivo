import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { StorageService } from '@services/storage.service'
import { User } from '@models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile: User;

  constructor(
    private api: ApiService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.storage.getItem("userProfile").subscribe( user => {
      this.profile = user;
      if(this.profile === null){
        this.api.getUserById(Number(localStorage.getItem('user_id'))).
        subscribe((data: User) => {
            this.storage.setItem("userProfile", data)
          })
      }
    })
  }

  workLocation(location) {
    this.profile.workLatitude = location.lat;
    this.profile.workLongitude = location.lng;
  };

  homeLocation(location) {
    this.profile.homeLatitude = location.lat;
    this.profile.homeLongitude = location.lng;
  };

  onSubmit() {
    this.api.updateProfile(this.profile, Number(localStorage.getItem('user_id'))).subscribe((data: Record<string, any>) => {
      console.log(data);
    });
  }

}
