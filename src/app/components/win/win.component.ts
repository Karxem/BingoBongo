import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule]
})
export class WinComponent {
  @Input({ required: true }) bingoText: string = "";
  @Input({ required: true }) isShown: boolean = false;

  public faRetweet = faRetweet;

  public testButton(): void {
    console.log("Reload button was pressed");
  }
}
