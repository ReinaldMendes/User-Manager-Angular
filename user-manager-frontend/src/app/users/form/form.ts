// user-form.component.ts (AGORA ATUALIZADO)

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

// 💡 IMPORTS ADICIONADOS DO RXJS para o switchMap
import { Observable, switchMap, of } from 'rxjs'; 

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
  templateUrl: './form.html'
  ,styleUrls: ['./form.scss']
})
export class UserFormComponent implements OnInit {
// ... (restante do código até o ngOnInit() é o mesmo)

  form = new FormGroup<{
    id: FormControl<number | null>;
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    age: FormControl<number | null>;
    status: FormControl<string | null>;
    permissions: FormControl<string[] | null>;
  }>({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl<string | null>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string | null>(null),
    age: new FormControl<number | null>(null, [
      Validators.min(18)
    ]),
    status: new FormControl<string | null>('ativo', Validators.required),
    permissions: new FormControl<string[] | null>([], Validators.required)
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
      this.userService.getById(+id).subscribe((u: User) => {
        // patchValue will map matching controls; includes password if present
        this.form.patchValue(u as any);
      });
    }

    // If creating a new user, require password
    if (!this.isEdit) {
      this.form.controls.password.setValidators([Validators.required, Validators.minLength(6)]);
      this.form.controls.password.updateValueAndValidity();
    }
  }

  // 💡 FUNÇÃO SUBMIT ATUALIZADA COM switchMap
  submit() {
    if (this.form.invalid) return;

    const data = this.form.getRawValue() as User;

    if (this.isEdit) {
      // 1. Define o Observable de atualização (updateObs)
      let updateObs: Observable<any>;

      // Se a senha não foi fornecida na edição, precisamos buscar a antiga primeiro
      if (!data.password) {
        // Busca o usuário existente -> combina a senha antiga -> faz o update
        updateObs = this.userService.getById(data.id!).pipe(
          switchMap(existing => {
            const merged = { ...data, password: existing.password } as User;
            return this.userService.update(data.id!, merged);
          })
        );
      } else {
        // Se a senha foi alterada, faça o update direto
        updateObs = this.userService.update(data.id!, data);
      }

      // 2. Subscreve ao updateObs e trata o sucesso
      updateObs.subscribe(() => {
        this.snack.open('Usuário atualizado', 'Fechar', { duration: 2000, panelClass: ['snack-success'] });
        this.router.navigate(['/users']);
      });

    } else {
      // LÓGICA DE CRIAÇÃO (Já estava correta)
      this.userService.create(data).subscribe(() => {
        this.snack.open('Usuário criado', 'Fechar', { duration: 2000, panelClass: ['snack-success'] });
        this.router.navigate(['/users']);
      });
    }
  }

  onPermChange(permission: string, checked: boolean) {
  const current = this.form.value.permissions || [];

  let updated;

  if (checked) {
    updated = [...current, permission];
  } else {
    updated = current.filter(p => p !== permission);
  }

  this.form.controls.permissions.setValue(updated);
  this.form.controls.permissions.markAsTouched();
}

}