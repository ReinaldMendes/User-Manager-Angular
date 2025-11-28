import { Routes } from '@angular/router';
import { UsersListComponent } from './users/list/list';
import { UserFormComponent } from './users/form/form';
import { UserDetailsComponent } from './users/details/details';
import { LoginComponent } from './auth/login/login';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
