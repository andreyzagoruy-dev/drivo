import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.email, this.password)
      .pipe(
        switchMap(response => this.api.getUserById(response.user_id))
      )
      .subscribe((response) => {
        this.storage.setItem('userProfile', response);
        this.router.navigate(['/trips']);
      });
  }

}
