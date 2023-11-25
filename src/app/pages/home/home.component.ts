import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Login } from 'src/app/shared/login.model';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { RedirectionService } from 'src/app/shared/redirection.service';
import { DrawerComponent } from 'src/app/components/drawer/drawer.component';
import { Color } from 'src/app/shared/color.model';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DrawerComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public username: string = 'Bob';
  public activeColor: Color = 'default';
  
  constructor(private storageService: StorageService, public authService: AuthenticationService, public redirectService: RedirectionService) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      alert('An unexpected Login Error occured!');
    }

    const login: Login = this.authService.isLoggedIn();
    this.username = login.username;
  }

  public changeColor(color: string):void {
    this.activeColor = color as Color;

    this.storageService.setItem('activeColor', color)
  }
}
