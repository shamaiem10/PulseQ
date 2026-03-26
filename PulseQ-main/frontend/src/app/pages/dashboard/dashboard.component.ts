import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="dash">
      <div class="content">
        <h1>TaskFlow</h1>
        <p>Manage your tasks efficiently</p>
        <div class="actions">
          <button routerLink="/tasks">View Tasks</button>
          <button routerLink="/tasks/new" class="outline">Create Task</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

    .dash {
      min-height: 100vh;
      background: #0a0a0a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
    }

    .content {
      text-align: center;
    }

    h1 {
      font-size: 40px;
      font-weight: 600;
      color: #ff8fcf;
      margin: 0 0 10px;
      letter-spacing: -0.03em;
    }

    p {
      font-size: 15px;
      color: rgba(255,255,255,0.35);
      margin: 0 0 40px;
      font-weight: 300;
    }

    .actions {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    button {
      padding: 10px 22px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      transition: opacity 0.15s;
      border: none;
      background: #ff8fcf;
      color: #0a0a0a;
    }

    button:hover {
      opacity: 0.85;
    }

    button.outline {
      background: transparent;
      border: 1px solid rgba(255,143,207,0.3);
      color: #ff8fcf;
    }

    button.outline:hover {
      border-color: rgba(255,143,207,0.6);
      opacity: 1;
    }
  `]
})
export class DashboardComponent {}