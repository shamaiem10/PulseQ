import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.loading = true;
    this.error = '';
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.auth.saveUser(res.user);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Invalid credentials';
        this.loading = false;
      }
    });
  }
}