import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private dark$ = new BehaviorSubject<boolean>(false);

  get isDark() {
    return this.dark$.value;
  }

  toggle() {
    this.dark$.next(!this.dark$.value);
  }

  // expose observable if needed
  get changes() {
    return this.dark$.asObservable();
  }
}
