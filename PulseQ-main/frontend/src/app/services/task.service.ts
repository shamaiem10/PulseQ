import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : ''
      })
    };
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, this.getHeaders());
  }

  
  addTask(task: Omit<Task, '_id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, this.getHeaders());
  }

  toggleStatus(taskId: string, status: 'Pending' | 'Completed'): Observable<Task> {
    return this.http.put<Task>(
      `${this.apiUrl}/${taskId}`,
      { status },
      this.getHeaders()
    );
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`, this.getHeaders());
  }
}