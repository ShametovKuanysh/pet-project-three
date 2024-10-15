import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import Project from '../../interfaces/project';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectFormComponent } from "./project-form/project-form.component";
import { CommonModule } from '@angular/common';
import { ChaptersComponent } from '../chapters/chapters.component';



@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgbPopoverModule, ProjectFormComponent, CommonModule, ChaptersComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  @Input() project!: Project
  @Output() reload: EventEmitter<any> = new EventEmitter()
  show_form: boolean = false
  
  constructor(private projectService: ProjectService) {
    
  }
  ngOnInit(): void {
    console.log('Project', this.project)
  }

  updateProject(){
    this.show_form = true;
    // this.projectService
  }

  deleteProject(){
    this.projectService.deleteProject(this.project.id).subscribe(() => {
      this.show_form = false;
      this.reload.emit()
    })
  }

  cancel(){
    this.reload.emit()
    this.show_form = false;
  }
}
