import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ThemeService } from '../../services/theme.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule, MatSnackBarModule, MatDialogModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  private theme = inject(ThemeService);
  private snack = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  get isDark() { return this.theme.isDark; }
  toggle() { this.theme.toggle(); }

  logout() {
    const ref = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Sair', message: 'Deseja realmente sair do sistema?', confirmLabel: 'Sair', confirmColor: 'primary' } });
    ref.afterClosed().subscribe(res => {
      if (res === true) {
        localStorage.removeItem('auth');
        sessionStorage.removeItem('user');
        this.snack.open('Você saiu com sucesso', undefined, { duration: 1800, panelClass: ['snack-success'] });
        this.router.navigate(['/login']);
      }
    });
  }
}
