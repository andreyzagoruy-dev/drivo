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
    return this.auth.isLoggedIn();
  }
}
