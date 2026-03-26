import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task!: Task;

  // Emits events to parent (TaskListComponent) to handle backend API calls
  @Output() toggle = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}