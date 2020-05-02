import { Directive, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[inputListener]'
})
export class InputListenerDirective implements OnDestroy {
  public changes: Subject<string> = new Subject();

  @HostListener('keyup', ['$event.target.value']) onKeyUp(currentValue: string) {
    this.changes.next(currentValue);
  }

  ngOnDestroy() {
    this.changes.complete();
  }
}
