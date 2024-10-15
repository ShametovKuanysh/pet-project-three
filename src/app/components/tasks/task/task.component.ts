import { Component, EventEmitter, inject, Input, Output, TemplateRef } from '@angular/core';
import Task from '../../../interfaces/task';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!: Task
  @Output() reload: EventEmitter<Task> = new EventEmitter();
  updAttr: string = ''
  private modalService = inject(NgbModal);

  constructor(private taskService: TasksService){}

  taskClose(){
    this.task.closed_at = this.task.is_done ? new Date() : null;
    this.taskService.updateTask(this.task).subscribe(task => {
      this.task = task;
    })
  }

  taskUpdate(){
    this.updAttr = ''
    this.taskService.updateTask(this.task).subscribe(task => {
      this.task = task;
      this.reload.emit(task);
    })
  }

  cancel(){
    this.updAttr = ''
  }

  upd(attr: string){
    this.updAttr = attr;
  }


	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        result == 'save' ? this.taskUpdate() : null
			}
		);
	}
}
