import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];
  loading = false;
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;

    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

  toggleStatus(task: Task): void {
    this.taskService
      .toggleStatus(task._id, task.status === 'Pending' ? 'Completed' : 'Pending')
      .subscribe({
        next: (updatedTask: Task) => {
          task.status = updatedTask.status;
        },
        error: () => alert('Failed to update status')
      });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task._id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t._id !== task._id);
      },
      error: () => alert('Failed to delete task')
    });
  }
}