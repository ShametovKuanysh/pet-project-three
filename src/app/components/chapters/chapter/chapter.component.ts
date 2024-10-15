import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChapterService } from '../../../services/chapter.service';
import Chapter from '../../../interfaces/chapter';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ChapterFormComponent } from '../chapter-form/chapter-form.component';
import { TasksComponent } from "../../tasks/tasks.component";

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [NgbPopoverModule, ChapterFormComponent, CommonModule, TasksComponent],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss'
})
export class ChapterComponent {
  @Input() chapter!: Chapter
  @Output() reload: EventEmitter<any> = new EventEmitter()
  all: boolean = false

  show_form: boolean = false
  
  constructor(private chapterService: ChapterService) {
    
  }
  ngOnInit(): void {
    console.log('Project', this.chapter)
  }

  updateChapter(){
    this.show_form = true;
    // this.projectService
  }

  deleteChapter(){
    this.chapterService.deleteChapter(this.chapter.id).subscribe(() => {
      this.show_form = false;
      this.reload.emit()
    })
  }

  cancel(){
    this.reload.emit()
    this.show_form = false;
  }
}
