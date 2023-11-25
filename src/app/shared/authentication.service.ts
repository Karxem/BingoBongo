// authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Login } from './login.model';
import { RedirectionService } from './redirection.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedIn: Login = { isLoggedIn: false, username: '' };
  apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private redirectService: RedirectionService) {}

  login(username: string, password: string): Observable<any> {
    const userData = { username, password };
    return this.http.post<boolean>(`${this.apiUrl}/login`, userData).pipe(
      tap((success: boolean) => {
        this.loggedIn.isLoggedIn = success; // Log in on success
        this.loggedIn.username = username;
      }),
      catchError((error) => {
        console.error('Error during login', error);
        return of(false);
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    const registerData = { username, password };
    return this.http.post<any>(`${this.apiUrl}/register`, registerData).pipe(
      tap((response) => {
        if (response.success) {
          this.loggedIn.isLoggedIn = true; // Automatically log in after registration
          this.loggedIn.username = username;
        }
      }),
      catchError((error) => {
        console.error('Error during registration', error);
        return of({ success: false, message: 'Registration failed' });
      })
    );
  }

  logout(): void {
    this.redirectService.redirect('/');
    this.loggedIn.isLoggedIn = false;
  }

  isLoggedIn(): Login {
    return this.loggedIn || !!sessionStorage.getItem('token');
  }
}
