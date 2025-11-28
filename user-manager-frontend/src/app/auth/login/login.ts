import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  form: any;

  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    const { email, password } = this.form.value as any;
    this.userService.authenticate(email, password).subscribe({
      next: user => {
        this.loading = false;
        if (user) {
          // naive login: store user in sessionStorage and mark auth
          sessionStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('auth', 'true');
          this.router.navigate(['/users']);
        } else {
          this.error = 'Credenciais inválidas';
        }
      },
      error: () => { this.loading = false; this.error = 'Erro ao conectar'; }
    });
  }
}
