import { Routes } from '@angular/router';
import { UsersListComponent } from './users/list/list';
import { UserFormComponent } from './users/form/form';
import { UserDetailsComponent } from './users/details/details';
import { LoginComponent } from './auth/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: '**', redirectTo: 'users' }
];
