import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { ApiService } from '@app/services/api.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email: string;
  public password: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private api: ApiService,
    private storage: StorageService
  ) { }

  login() {
    this.auth.login(this.email, this.password)
      .pipe(
        switchMap(
          ({ id }) => this.api.getActiveTrip(id),
          (userProfile, activeTrip) => ({ userProfile, activeTrip })
        )
      )
      .subscribe(({ userProfile, activeTrip }) => {
        this.storage.setItem('userProfile', userProfile);
        this.storage.setItem('activeTrip', activeTrip);
        this.router.navigate(['/trips']);
      });
  }
}
