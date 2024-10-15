import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import Project from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url = `${this.dataService.url}/projects`;

  constructor(private dataService: DataService, private http: HttpClient) { }

  getProjects(){
    return this.http.get<Project[]>(`${this.url}/all`);
  }

  createProject(project: Project){
    return this.http.post<Project>(`${this.url}/add`, project);
  }

  updateProject(project: Project){
    return this.http.put<Project>(`${this.url}/upd/${project.id}`, project);
  }

  deleteProject(id: number){
    return this.http.delete(`${this.url}/del/${id}`);
  }
}
