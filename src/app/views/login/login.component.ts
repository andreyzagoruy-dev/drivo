import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { ApiService } from '@services/api.service';
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
    private api: ApiService,
    private auth: AuthService,
    private storage: StorageService
  ) { }

  login() {
    this.auth.login(this.email, this.password)
      .pipe(
        switchMap((response) => this.api.getUserById(response.id))
      )
      .subscribe((response) => {
        this.storage.setItem('userProfile', response);
        this.router.navigate(['/trips']);
      });
  }
}
