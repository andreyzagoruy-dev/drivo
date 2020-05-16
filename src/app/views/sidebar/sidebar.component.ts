import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private isOpen = false;

  constructor(
    private storage: StorageService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.storage.getItem('isSidebarOpen')
    .subscribe((statusOfSidebar) => {
      this.isOpen = statusOfSidebar
    })
  }

  toggleSidebar() {
    this.storage.setItem('isSidebarOpen', false);
  }

  public logout(): void {
    this.auth.logout();
  }
}
