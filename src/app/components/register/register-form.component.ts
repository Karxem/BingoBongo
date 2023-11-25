import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ButtonComponent } from '../button/button.component';
import { Color } from 'src/app/shared/color.model';
import { StorageService } from 'src/app/shared/storage.service';
import { RedirectionService } from 'src/app/shared/redirection.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  username: string = '';
  password: string = '';
  public activeColor: Color = 'default';

  constructor(
    private authService: AuthenticationService,
    private storageService: StorageService,
    private redirectService: RedirectionService,
  ) {}

  ngOnInit(): void {
    if (!this.storageService.getItem('activeColor')) {
      this.storageService.setItem('activeColor', 'default');
    }

    this.activeColor = this.storageService.getItem('activeColor') as Color;
  }

  register() {
    this.authService.register(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
          alert('Registration successful');
          this.redirectService.redirect('login') // Redirect to the login page after registration
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
