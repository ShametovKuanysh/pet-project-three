import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [AuthService, AlertService]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private alertService: AlertService){

  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }
    // , { validators: this.passwordMatchValidator }
    );
  }

  signup(){
    if(this.signupForm.valid){
      const {email, password} = this.signupForm.value
      this.authService.signup(email, password).subscribe(data => {
        if(data){
          this.alertService.show({message: 'Successfully signed up', classname: 'bg-success text-light'})
          this.router.navigate(['/login'])
        }
      })
    } else {
      this.alertService.show({message: 'Error in sign Up form', classname: 'bg-danger text-light'})
    }
  }
}
