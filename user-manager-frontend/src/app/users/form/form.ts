// user-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../models/user.models';

import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './form.html',
  styleUrls: ['./form.scss']
})
export class UserFormComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl<string | null>(null),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null),
    age: new FormControl<number | null>(null),
    status: new FormControl<string>('ativo'),
    permissions: new FormControl<string[]>([])
  });

  permissionsList = ['admin', 'editor', 'viewer'];
  isEdit = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'new') {
      this.isEdit = true;

      this.userService.getById(id).subscribe(user => {
        this.form.patchValue({
          id: user.id,
          name: user.name,
          email: user.email,
          password: null, // Não preenche senha
          age: user.age,
          status: user.status,
          permissions: user.permissions || []
        });
      });
    } else {
      // password obrigatório no create
      this.form.controls.password.setValidators([Validators.required, Validators.minLength(6)]);
      this.form.controls.password.updateValueAndValidity();
    }
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.getRawValue() as User;

    if (this.isEdit) {

      let obs: Observable<any>;

      // Buscar senha antiga se o campo estiver vazio
      if (!data.password) {
        obs = this.userService.getById(data.id!).pipe(
          switchMap(oldUser => {
            return this.userService.update(data.id!, {
              ...data,
              password: oldUser.password
            });
          })
        );
      } else {
        obs = this.userService.update(data.id!, data);
      }

      obs.subscribe(() => {
        this.snack.open('Usuário atualizado', 'Fechar', { duration: 2000 });
        this.router.navigate(['/users']);
      });

    } else {
      // Create
      this.userService.create(data).subscribe(() => {
        this.snack.open('Usuário criado', 'Fechar', { duration: 2000 });
        this.router.navigate(['/users']);
      });
    }
  }

  onPermChange(permission: string, checked: boolean) {
    const current = this.form.value.permissions || [];
    const updated = checked
      ? [...current, permission]
      : current.filter(p => p !== permission);

    this.form.controls.permissions.setValue(updated);
  }
}
