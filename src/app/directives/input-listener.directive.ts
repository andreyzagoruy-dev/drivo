import { Directive, HostListener, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[inputListener]'
})
export class InputListenerDirective implements OnDestroy {
  public focus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public changes: BehaviorSubject<string> = new BehaviorSubject('');

  @HostListener('focus') onFocus() {
    this.focus.next(true);
  }

  @HostListener('blur') onBlur() {
    this.focus.next(false);
  }

  @HostListener('keyup', ['$event.target.value']) onKeyUp(currentValue: string) {
    this.changes.next(currentValue);
  }

  ngOnDestroy() {
    this.changes.complete();
  }
}
