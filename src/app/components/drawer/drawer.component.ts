import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faArrowRightToBracket,
  faBrush,
  faChevronDown,
  faCode,
  faDroplet,
  faEarthEurope,
  faFileSignature,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Color } from 'src/app/shared/color.model';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class DrawerComponent implements OnInit {
  @Output() chooseColorEvent = new EventEmitter<string>();

  public faBrush = faBrush;
  public faXMark = faXmark;
  public faCode = faCode;
  public faDroplet = faDroplet;
  public faChevronDown = faChevronDown;
  public faArrowRightToBracket = faArrowRightToBracket;
  public faEarthEurope = faEarthEurope;
  public faFileSignature = faFileSignature;
  public faUsers = faUsers;
  public faArrowRight = faArrowRight;

  public activeColor: Color = 'default';
  public isToggled: boolean = false;
  public isColors: boolean = false;

  constructor(private storageService: StorageService, public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.activeColor = this.storageService.getItem('activeColor') as Color;
  }

  public toggleDrawer(): void {
    this.isToggled = !this.isToggled;

    if (this.isToggled) {
      this.isColors = false;
    }
  }

  public toggleColors(): void {
    this.isColors = !this.isColors;
  }

  public onColorChange(color: Color) {
    this.chooseColorEvent.emit(color);
    this.activeColor = color;
  }
}
