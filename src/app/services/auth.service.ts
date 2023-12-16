import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth } from '../interfaces/auth';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://127.0.0.1:8000/api/v1';

  http = inject(HttpClient);
  route = inject(Router);

  constructor() { }

  loginVoter(data: { email: string, password: string }): Observable<Auth> {
    return this.http.post<Auth>(`${this.url}/login`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }

  isAuthenticated(){
    return localStorage.getItem('user_token') != null;
  }

  logout() {
    localStorage.removeItem('user_token');
    this.route.navigate(['login']);
  }
}
