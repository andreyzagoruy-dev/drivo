import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
  ) {}

  logout(): void {
    this.auth.logout();
  }

  isLogin(): boolean {
    if (localStorage.getItem('user_id') && localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
