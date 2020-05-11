import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '@app/services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private loadingStateSubscription: Subscription;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.loadingStateSubscription = this.storage.getItem('isLoading')
      .subscribe((appLoadingState) => {
        this.isLoading = appLoadingState;
      });
  }

  ngOnDestroy() {
    this.loadingStateSubscription.unsubscribe();
  }
}
