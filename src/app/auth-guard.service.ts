import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const AuthGuardService:CanActivateFn = () => {

  let isauthenticated = inject(AuthService).isLoggedIn()
  let router = inject(Router)
 
      if (isauthenticated) {
       return true;
     } else {
       router.navigate(['/login']);
       return false;
     }
 }