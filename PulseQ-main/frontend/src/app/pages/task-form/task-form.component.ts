import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  title = '';
  description = '';
  loading = false;
  errorMessage = '';

  constructor(private taskService: TaskService, private router: Router) {}

  submit(form: any) {
    if (form.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    this.taskService.addTask({
      title: this.title,
      description: this.description,
      status: 'Pending'
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Failed to create task';
      }
    });
  }
}