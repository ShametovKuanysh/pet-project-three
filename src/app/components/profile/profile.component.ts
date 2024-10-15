import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from "../projects/projects.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProjectsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor() { }

}
