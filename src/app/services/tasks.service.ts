import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import Task from '../interfaces/task';
import { HttpClient } from '@angular/common/http';
import Chapter from '../interfaces/chapter';
import Project from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url = `${this.dataService.url}/tasks`;

  constructor(private dataService: DataService, private http: HttpClient) { }

  getTasksByChapter(chapter: Chapter){
    return this.http.get<Task[]>(`${this.url}/get/c/${chapter.id}`);
  }

  getTasksByProject(project: Project){
    return this.http.get<Task[]>(`${this.url}/get/p/${project.id}`);
  }

  getTask(id: number){
    return this.http.get<Task[]>(`${this.url}/get/${id}`);
  }

  createTask(task: Task){
    return this.http.post<Task>(`${this.url}/add`, task);
  }

  updateTask(task: Task){
    return this.http.put<Task>(`${this.url}/upd/${task.id}`, task);
  }

  deleteTask(id: number){
    return this.http.delete(`${this.url}/del/${id}`);
  }
}
