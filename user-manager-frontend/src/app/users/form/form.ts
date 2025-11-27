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
})
export class UserFormComponent implements OnInit {

  form = new FormGroup<{
    id: FormControl<number | null>;
    name: FormControl<string | null>;
    email: FormControl<string | null>;
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
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'new') {
      this.isEdit = true;
      this.userService.getById(+id).subscribe((u: User) => {
        this.form.patchValue(u);
      });
    }
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.getRawValue() as User;

    if (this.isEdit) {
      this.userService.update(data.id!, data).subscribe(() => {
        this.snack.open('Usuário atualizado', 'Fechar', { duration: 2000 });
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.create(data).subscribe(() => {
        this.snack.open('Usuário criado', 'Fechar', { duration: 2000 });
        this.router.navigate(['/users']);
      });
    }
  }

  onPermChange(event: any) {
    const current = this.form.controls.permissions.value ?? [];

    if (event.checked) {
      this.form.controls.permissions.setValue([...current, event.source.value]);
    } else {
      this.form.controls.permissions.setValue(
        current.filter(p => p !== event.source.value)
      );
    }

    this.form.controls.permissions.markAsTouched();
  }
}
