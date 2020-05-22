import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public isOpen = false;

  constructor(
    private storage: StorageService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.storage.getItem('isSidebarOpen')
      .subscribe((sidebarStatus) => {
        this.isOpen = sidebarStatus;
      });
  }

  public closeSidebar(): void {
    this.storage.setItem('isSidebarOpen', false);
  }

  public logout(): void {
    this.auth.logout();
  }
}
