import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ApiService } from '@services/api.service';
import { StorageService } from '@services/storage.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private storage: StorageService
  ) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.email, this.password)
      .pipe(
        switchMap(response => this.api.getUserById(response.user_id))
      )
      .subscribe((response) => {
        this.storage.setItem('userId', response.id);
        this.storage.setItem('userProfile', response);
      });
  }

  logout() {
    this.auth.logout();
  }

}
