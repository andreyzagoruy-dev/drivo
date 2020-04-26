import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ApiService } from '@services/api.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isSidebarOpen = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private api: ApiService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.api.getUserById(this.auth.getUserId())
        .subscribe((userProfileResponse) => {
          this.storage.setItem('userProfile', userProfileResponse);
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  public toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public logout(): void {
    this.auth.logout();
  }
}
