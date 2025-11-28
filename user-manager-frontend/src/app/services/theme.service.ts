import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private dark$ = new BehaviorSubject<boolean>(false);

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') this.dark$.next(true);
    else this.dark$.next(false);
  }

  get isDark() {
    return this.dark$.value;
  }

  toggle() {
    const next = !this.dark$.value;
    this.dark$.next(next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (e) {}
  }


  get changes() {
    return this.dark$.asObservable();
  }
}
