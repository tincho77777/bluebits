import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLUsers = environment.apiURL + 'users';

  constructor( private http: HttpClient, private token: LocalstorageService, private router: Router) { }

  //para loguearse
  login( email: string, password: string): Observable<User>{
    return this.http.post<User>(`${this.apiURLUsers}/login`, {email:email, password:password})
  }

  //para salir del login
  logout(){
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
