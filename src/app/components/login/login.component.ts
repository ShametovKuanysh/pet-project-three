import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService, AlertService]
})
export class LoginComponent {
  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private alertService: AlertService){
  }

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    if(this.loginForm.valid){
      const {email, password} = this.loginForm.value
      this.authService.login(email, password).subscribe((data) => {
        if(data){
          this.router.navigate(['/profile'])
          this.alertService.show({message: 'Successfully signed up', classname: 'bg-success text-light'})
        }
      })
    }
  }
}
