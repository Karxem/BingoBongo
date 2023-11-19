import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginFormComponent } from 'src/app/components/login/login-form.component';
import { Login } from 'src/app/shared/login.model';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
})
export class LoginComponent {

}
