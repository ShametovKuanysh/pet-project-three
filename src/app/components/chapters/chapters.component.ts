import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChapterFormComponent } from './chapter-form/chapter-form.component';
import Chapter from '../../interfaces/chapter';
import Project from '../../interfaces/project';
import { ChapterService } from '../../services/chapter.service';
import { ChapterComponent } from "./chapter/chapter.component";

@Component({
  selector: 'app-chapters',
  standalone: true,
  imports: [CommonModule, ChapterFormComponent, ChapterComponent],
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.scss'
})
export class ChaptersComponent implements OnInit {
  @Input() project!: Project
  
  open_form: boolean = false;
  chapters: Chapter[] = [];

  constructor(private chapterService: ChapterService) {}

  ngOnInit(): void {
    this.loadChapters();
  }

  loadChapters(): void {
    if (this.project){
      this.chapterService.getChaptersByProject(this.project?.id).subscribe(chapters => {
        this.chapters = chapters
      })
    }
  }

  addChapter(){
    this.open_form = true;
  }

  cancelChapter(){
    this.open_form = false;
    this.loadChapters();
  }
}
