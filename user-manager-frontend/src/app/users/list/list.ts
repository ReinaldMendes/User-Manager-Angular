import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.models';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';

import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns = ['name', 'email', 'age', 'status', 'actions'];
  users: User[] = [];
  loading = false;

  search = new FormControl('');
  status = new FormControl('todos');
  ageRange = new FormControl('todos');

  page = 1;
  limit = 5;
  total = 0;

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private router: Router            // ✔️ NECESSÁRIO PARA goDetails()
  ) {}

  ngOnInit() {
    this.load();

    this.search.valueChanges.subscribe(() => this.load(1));
    this.status.valueChanges.subscribe(() => this.load(1));
    this.ageRange.valueChanges.subscribe(() => this.load(1));
  }

  buildParams(page = 1) {
    const params: any = { _page: page, _limit: this.limit };

    const q = this.search.value?.trim();
    if (q) params.q = q;

    const st = this.status.value;
    if (st && st !== 'todos') params.status = st;

    const ar = this.ageRange.value;
    if (ar && ar !== 'todos') {
      if (ar === '18-30') { params.age_gte = 18; params.age_lte = 30; }
      if (ar === '31-50') { params.age_gte = 31; params.age_lte = 50; }
      if (ar === '50+') { params.age_gte = 51; }
    }

    return params;
  }

  load(page = this.page) {
    this.loading = true;

    const params = this.buildParams(page);

    this.userService.list(params).subscribe({
      next: (res: any) => {
        this.users = res;
        this.total = 100;
        this.page = page;

        this.loading = false;

        this.cd.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.snack.open('Erro ao carregar usuários', 'Fechar', { duration: 3000 });
        this.cd.detectChanges();
      }
    });
  }

  // ✔️ Método que estava faltando
  goDetails(id: number) {
    this.router.navigate(['/users', id]);
  }

  confirmDelete(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: `Deseja excluir o usuário "${user.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.userService.delete(user.id!).subscribe(() => {
          this.snack.open('Usuário excluído', 'Fechar', { duration: 2000 });
          this.load(1);
        });
      }
    });
  }
}
