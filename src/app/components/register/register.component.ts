// register.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
          alert('Registration successful');
          this.router.navigate(['/login']); // Redirect to the login page after registration
        } else {
          // Handle registration failure
          console.log('Registration failed');
        }
      },
      (error) => {
        console.error('Error during registration', error);
      }
    );
  }
}
