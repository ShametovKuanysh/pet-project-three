import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { CommonModule } from '@angular/common';
import Task from '../../interfaces/task';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import Chapter from '../../interfaces/chapter';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, OnChanges {
  @Input() chapter!: Chapter
  @Input() all: boolean = false

  tasks: Task[] = [];
  is_edited: boolean = false;
  taskForm!: FormGroup

  constructor(private fb: FormBuilder, private taskService: TasksService) {
    
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      due_date: [''],
      is_done: [false]
    })

    this.loadTasks()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadTasks()
  }

  submit(){
    if (this.taskForm.valid){
      const task = this.taskForm.value
      task.chapter_id = this.chapter.id

      this.taskService.createTask(task).subscribe(task => {
        this.loadTasks()
      })
    }

    this.is_edited = false
  }

  loadTasks(){
    this.taskService.getTasksByChapter(this.chapter).subscribe(task => {
      this.tasks = task.filter(x => this.all ? x : x.is_done == true)
      console.log(this.tasks)
    })
  }

}
