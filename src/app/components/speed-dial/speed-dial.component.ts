import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightToBracket, faPlus, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-speed-dial',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './speed-dial.component.html',
})
export class SpeedDialComponent {
  public isToggled: boolean = false;
  public faArrowRightToBracket = faArrowRightToBracket;
  public faTrophy = faTrophy;
  public faPlus = faPlus;

  public toggleDial(): void {
    this.isToggled = !this.isToggled;
  }
}
