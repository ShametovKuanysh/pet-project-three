import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TodosComponent } from './components/todos/todos.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TodoComponent } from './components/todo/todo.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuardService } from './auth-guard.service';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
    {path: 'profile/todos', component: TodosComponent, canActivate: [AuthGuardService]},
    {path: 'profile/todos/:id', component: TodoComponent, canActivate: [AuthGuardService]},
    {path: 'todos/edit/:id', component: TodoFormComponent, canActivate: [AuthGuardService]},
    {path: '**', redirectTo: ''}
];
