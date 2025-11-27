import { Routes } from '@angular/router';
import { UsersListComponent } from './users/list/list';
import { UserFormComponent } from './users/form/form';
import { UserDetailsComponent } from './users/details/details';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: '**', redirectTo: 'users' }
];
