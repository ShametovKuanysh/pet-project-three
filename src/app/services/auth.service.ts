import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../interfaces/user';
import moment from "moment";
import { catchError, map, of, shareReplay } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${this.dataService.url}/users`;
  private expiryTimer: any;

  constructor(private http: HttpClient, private router: Router, private dataService: DataService, private alertService: AlertService) { }

  signup(email: string, password: string){
    return this.http.post(`${this.url}/signup`, {email, password})
  }

  login(email: string, password: string){
    return this.http.post<{user: User, token: any, expiresIn: number}>(`${this.url}/login`, {email, password}).pipe(
      map(response => {
        localStorage.setItem('JWT_Token', response.token);
        localStorage.setItem("expires_at", JSON.stringify(moment().add(response.expiresIn,'second').valueOf()))
        this.expiryTimer = setInterval(() => { this.checkExpiry(); }, 60000);
        return true;
      }),
      catchError(error => {
        console.log(error);
        this.alertService.show({message: 'Error on Login', classname: 'bg-danger text-light'})
        this.logout()
        return of(false);
      })
    ); 
  }      

  private checkExpiry(): void {
    console.log('1')
    if (this.isLoggedOut()) this.logout();
  }

  logout() {
    localStorage.removeItem("JWT_Token");
    localStorage.removeItem("expires_at");
    if (this.expiryTimer) clearInterval(this.expiryTimer);
    this.router.navigate(['/login']);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if(!expiration) return null;
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }    
}