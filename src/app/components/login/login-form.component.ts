import { tap } from 'rxjs/operators';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, catchError, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ButtonComponent } from '../button/button.component';
import { Color } from 'src/app/shared/color.model';
import { StorageService } from 'src/app/shared/storage.service';
import { Login } from 'src/app/shared/login.model';
import { RedirectionService } from 'src/app/shared/redirection.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, RouterLink],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginResponse$!: Observable<any>;
  public activeColor: Color = 'default';

  private storageService = inject(StorageService);
  private authService = inject(AuthenticationService);
  private redirectService = inject(RedirectionService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (!this.storageService.getItem('activeColor')) {
      this.storageService.setItem('activeColor', 'default');
    }

    this.activeColor = this.storageService.getItem('activeColor') as Color;
  }

  login() {
    this.authService
      .login(this.username, this.password)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        }),
        tap((response) => {
          if (response.success) {
            // Store the token in sessionStorage upon successful login
            sessionStorage.setItem('token', response.token);
            this.redirectService.redirect('/');
          } else {
            // Handle invalid credentials
            console.log('Invalid credentials');
          }
        })
      )
      .subscribe();
  }

  // Method to check if the user is logged in
  isLoggedIn(): Login {
    return this.authService.isLoggedIn();
  }
}
