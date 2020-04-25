import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
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
    private storage: StorageService
  ) { }

  login() {
    this.auth.login(this.email, this.password)
      .subscribe((userFromServer) => {
        this.storage.setItem('userProfile', userFromServer);
        this.router.navigate(['/trips']);
      });
  }
}
