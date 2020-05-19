import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { getPrettyDate } from '@app/helpers/date';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isCreateTripAllowed = false;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.storage.getItem('activeTrip')
      .subscribe((activeTrip) => {
        this.isCreateTripAllowed = !activeTrip;
      });
  }

  get today(): string {
    return getPrettyDate(new Date());
  }

  public openSidebar(): void {
    this.storage.setItem('isSidebarOpen', true);
  }
}
