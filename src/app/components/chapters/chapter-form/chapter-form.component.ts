import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Chapter from '../../../interfaces/chapter';
import { ChapterService } from '../../../services/chapter.service';

@Component({
  selector: 'app-chapter-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './chapter-form.component.html',
  styleUrl: './chapter-form.component.scss'
})
export class ChapterFormComponent implements OnInit {
  @Output() close = new EventEmitter<any>();
  @Input() chapter!: Chapter;
  @Input() project_id!: number;
  
  chapterForm!: FormGroup;

  constructor(private fb: FormBuilder, private chapterService: ChapterService){}

  ngOnInit(): void {
    this.chapterForm = this.fb.group({
      title: ['', [Validators.required]],
      project_id: ['', []],
    })

    if (this.chapter){
      this.chapterForm.patchValue(this.chapter);
    }
  }

  submit(){
    if (this.chapter){
      this.chapterService.updateChapter(this.chapterForm.value).subscribe(chapter => {
        this.close.emit(chapter);
      })
    } else {
      this.chapterForm.value.project_id = this.project_id; // Convert string to number for project_id field (if provided)
      this.chapterService.createChapter(this.chapterForm.value).subscribe(chapter => {
        this.close.emit(chapter);
      })
    }
  }

  cancel(){
    this.close.emit();
  }
}
