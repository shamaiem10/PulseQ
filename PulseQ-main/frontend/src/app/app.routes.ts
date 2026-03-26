import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component'; 

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 

  // protected routes
  { path: '', canActivate: [authGuard], component: DashboardComponent },
  { path: 'dashboard', canActivate: [authGuard], component: DashboardComponent },

  { path: 'tasks', canActivate: [authGuard], component: TaskListComponent },
  { path: 'tasks/new', canActivate: [authGuard], component: TaskFormComponent },

  // fallback
  { path: '**', redirectTo: '' }
];