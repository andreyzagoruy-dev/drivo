import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { StorageService } from '@services/storage.service';
import { User } from '@models/user';
import { HereMapsPlace } from '@models/map';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.userProfile;
  }

  public setLocation(type: 'work' | 'home', place: HereMapsPlace): void {
    const { prettyAddress, position: { lat, lng } } = place;
    this.user[`${type}Address`] = prettyAddress;
    this.user[`${type}Location`] = [lat, lng];
  }

  public isProfileFormValid(): boolean {
    const { fullname, homeLocation, workLocation } = this.user;
    const isHomeLocation = !!homeLocation.filter((coordinate) => coordinate !== 0).length;
    const isWorkLocation = !!workLocation.filter((coordinate) => coordinate !== 0).length;

    return fullname && isHomeLocation && isWorkLocation;
  }

  public onSubmit(): void {
    this.api.updateProfile(this.user, this.user.id)
      .subscribe((userFromServer) => {
        this.storage.setItem('userProfile', userFromServer);
        this.router.navigate(['/trips']);
      });
  }
}
