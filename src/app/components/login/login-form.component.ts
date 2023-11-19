import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { Color } from 'src/app/shared/color.model';
import { StorageService } from 'src/app/shared/storage.service';
import { Login } from 'src/app/shared/login.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginResponse$!: Observable<any>;
  public activeColor: Color = 'default';

  constructor(private storageService: StorageService, private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    if (!this.storageService.getItem('activeColor')) {
      this.storageService.setItem('activeColor', 'default');
    }
    
    this.activeColor = this.storageService.getItem('activeColor') as Color;
  }

  login() {
    this.loginResponse$ = this.authService.login(this.username, this.password);
    this.loginResponse$.subscribe(
      (response) => {
        if (response.success) {
          // Store the token in sessionStorage upon successful login
          sessionStorage.setItem('token', response.token);

          this.router.navigate(['/bingo']);
          console.log('ada');
        } else {
          // Handle invalid credentials
          console.log('Invalid credentials');
        }
      },
      (error) => {
        console.error('Error during login', error);
      }
    );
  }

  // Method to check if the user is logged in
  isLoggedIn(): Login {
    return this.authService.isLoggedIn();
  }
}
