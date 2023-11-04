import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BingoGridComponent } from 'src/app/components/bingo-grid/bingo-grid.component';
import { SpeedDialComponent } from 'src/app/components/speed-dial/speed-dial.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, BingoGridComponent, SpeedDialComponent]
})
export class HomeComponent {

}
