import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.loading = true;
    this.error = '';
    this.auth.register({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.error = err.error?.error || 'Registration failed';
        this.loading = false;
      }
    });
  }
}