import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import Chapter from '../interfaces/chapter';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  url = `${this.dataService.url}/chapters`

  constructor(private dataService: DataService, private http: HttpClient) { }

  getChaptersByProject(id: number){
    return this.http.get<Chapter[]>(`${this.url}/get/all/${id}`);
  }

  getChapterById(id: number) {
    return this.http.get<Chapter[]>(`${this.url}/get/${id}`);
  }

  createChapter(chapter: Chapter){
    return this.http.post<Chapter>(`${this.url}/add`, chapter);
  }

  updateChapter(chapter: Chapter){
    return this.http.put<Chapter>(`${this.url}/upd/${chapter.id}`, chapter);
  }

  deleteChapter(id: number){
    return this.http.delete(`${this.url}/del/${id}`);
  }
}
