import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './shared/header/header';
import { FooterComponent } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, MatButtonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('user-manager');
  constructor(private theme: ThemeService) {}

  get isDark() {
    return this.theme.isDark;
  }

  toggleTheme() {
    this.theme.toggle();
  }
}


