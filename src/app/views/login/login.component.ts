import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  login() {
    this.api.login(this.email, this.password)
      .subscribe((response) => {
        console.log('Login:', response);
      });
  }

}
