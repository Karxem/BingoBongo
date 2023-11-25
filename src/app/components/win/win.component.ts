import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRefresh, faRetweet, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule]
})
export class WinComponent {
  @Input({ required: true }) bingoText = '';

  public faTrophy = faTrophy;
  public faRefresh= faRefresh;
}
