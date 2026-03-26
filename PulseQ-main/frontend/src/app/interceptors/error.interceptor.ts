import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError(err => {
      // Auto-logout and redirect if token is expired or invalid
      if (err.status === 401) {
        auth.logout();
        router.navigate(['/login']);
      }

      console.error('HTTP Error:', err);
      return throwError(() => err);
    })
  );
};