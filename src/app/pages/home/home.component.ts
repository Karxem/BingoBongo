import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Login } from 'src/app/shared/login.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public username: string = 'Bob';
  
  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      alert('An unexpected Login Error occured!');
    }

    const login: Login = this.authService.isLoggedIn();
    this.username = login.username;
  }
}
