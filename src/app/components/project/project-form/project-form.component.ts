import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import Project from '../../../interfaces/project';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup
  @Input() project!: Project
  @Output() close: EventEmitter<any> = new EventEmitter()

  constructor(private fb: FormBuilder, private projectService: ProjectService){}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      color: [''],
      user_id: ['']
    })

    if (this.project) {
      this.projectForm.patchValue({
        id: this.project.id,
        title: this.project.title,
        color: this.project.color,
        user_id: this.project.user_id
      })
    }
  }

  submitForm(){
    if(this.projectForm.valid){
      if (this.project){
        this.projectService.updateProject(this.projectForm.value).subscribe(() => {
          this.close.emit()
        })
      } else {
        this.projectService.createProject(this.projectForm.value).subscribe(() => {
          this.close.emit()
        })
      }
    }
  }

  cancel(){
    this.close.emit()
  }
}
