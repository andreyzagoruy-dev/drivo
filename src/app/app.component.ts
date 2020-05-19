import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { ApiService } from '@services/api.service';
import { StorageService } from '@services/storage.service';
import { getPrettyDate } from '@app/helpers/date';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private api: ApiService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.api.getUserById(this.auth.getUserId())
        .pipe(
          switchMap(
            ({ id }) => this.api.getActiveTrip(id),
            (userProfile, activeTrip) => ({ userProfile, activeTrip })
          )
        )
        .subscribe(({ userProfile, activeTrip }) => {
          this.storage.setItem('userProfile', userProfile);
          this.storage.setItem('activeTrip', activeTrip);
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  get today(): string {
    return getPrettyDate(new Date());
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  toggleSidebar() {
    this.storage.setItem('isSidebarOpen', true);
  }
}
