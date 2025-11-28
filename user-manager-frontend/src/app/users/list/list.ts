import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatTableDataSource } from '@angular/material/table';

import { UserService } from '../../services/user.service';
import { ThemeService } from '../../services/theme.service';
import { User } from '../../models/user.models';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';
import { RouterModule, Router } from '@angular/router';

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
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class UsersListComponent implements OnInit {
  displayedColumns = ['name','email','age','status','actions'];
  dataSource = new MatTableDataSource<User>([]);
  loading = false;

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private cd: ChangeDetectorRef,
    private theme: ThemeService
  ) {}

  search = new FormControl('');
  status = new FormControl('todos');
  ageRange = new FormControl('todos');

  // paginator defaults
  pageSize = 5;
  pageIndex = 0;
  total = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  

  ngOnInit() {
    // watch inputs for reactive filtering
    this.search.valueChanges.subscribe(()=> this.applyFilters());
    this.status.valueChanges.subscribe(()=> this.applyFilters());
    this.ageRange.valueChanges.subscribe(()=> this.applyFilters());

    this.load();
  }

  // load raw data (paginação e total ficam calculadas localmente)
  load() {
    this.loading = true;
    const params: any = {}; // se usar json-server com query: enviar params
    this.userService.list(params).subscribe({
      next: (res: User[]) => {
        this.dataSource.data = res || [];
        this.total = res.length;
        // attach paginator & sort after data arrives
        setTimeout(()=> {
          if (this.paginator) this.dataSource.paginator = this.paginator;
          if (this.sort) this.dataSource.sort = this.sort;
          this.cd.detectChanges();
        }, 0);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snack.open('Erro ao carregar usuários', 'Fechar', { duration: 3000 });
        this.cd.detectChanges();
      }
    });
  }

  // MatTable filtering wrapper
  applyFilters() {
    const q = this.search.value?.trim().toLowerCase() || '';
    const st = this.status.value || 'todos';
    const ar = this.ageRange.value || 'todos';

    this.dataSource.filterPredicate = (user: User, filter: string) => {
      // filter param not used because we use closure
      const matchesSearch = !q || user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q);
      const matchesStatus = st === 'todos' || user.status === st;
      let matchesAge = true;
      if (ar !== 'todos') {
        if (user.age == null) matchesAge = false;
        else if (ar === '18-30') matchesAge = user.age >= 18 && user.age <= 30;
        else if (ar === '31-50') matchesAge = user.age >= 31 && user.age <= 50;
        else if (ar === '50+') matchesAge = user.age >= 51;
      }
      return matchesSearch && matchesStatus && matchesAge;
    };

    // force filter to trigger predicate
    this.dataSource.filter = '' + Math.random();
    // reset to page 0
    if (this.paginator) this.paginator.firstPage();
  }

  // Navigate to details
  goDetails(id?: number) {
    if (!id) return;
    this.router.navigate(['/users', id]);
  }

  // Open edit form
  goEdit(id?: number) {
    if (!id) return;
    this.router.navigate(['/users/edit', id]);
  }

  // Confirm delete flow
  confirmDelete(user: User) {
    const ref = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Confirmar exclusão', message: `Deseja excluir ${user.name}?` } });
    ref.afterClosed().subscribe(result => {
      if (result === true) {
        this.userService.delete(user.id!).subscribe({
          next: () => {
            this.snack.open('Usuário excluído', 'Fechar', { duration: 2000 });
            this.load();
          },
          error: () => this.snack.open('Erro ao excluir', 'Fechar', { duration: 2000 })
        });
      }
    });
  }

  // paginator event handler (se quiser manipular dados server-side)
  onPage(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    // se for server side -> load com params _page/_limit; hoje usamos client-side
  }

  // proxy para ThemeService — usado pelo template
  get isDark() {
    return this.theme.isDark;
  }

  toggleTheme() {
    this.theme.toggle();
  }

}
