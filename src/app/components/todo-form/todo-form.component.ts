import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent implements OnInit {
  todoForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      due_to: [''],
      created_at: [{value: '',disabled: true}],
      closed_at: [{value: '',disabled: true}],
      is_done: [false]
    })
  }

  action(){

  }
}
