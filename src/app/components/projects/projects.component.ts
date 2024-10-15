import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import Project from '../../interfaces/project';
import { ProjectComponent } from '../project/project.component';
import { ProjectFormComponent } from '../project/project-form/project-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectComponent, ProjectFormComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [];
  open_form: boolean = false;

  constructor(private projectService: ProjectService){}

  ngOnInit(): void {
    this.loadProjects()
  }

  loadProjects(){
    this.projectService.getProjects().subscribe(projects => {
      console.log(projects)  // for debugging purposes only, remove before production  // ^^
      this.projects = projects
    })
  }

  addProject(){
    this.open_form = true;
  }

  closeForm(){
    this.open_form = false;
    this.loadProjects();
  }
}
