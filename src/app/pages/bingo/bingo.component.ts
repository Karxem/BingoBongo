import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BingoGridComponent } from 'src/app/components/bingo-grid/bingo-grid.component';
import { DrawerComponent } from 'src/app/components/drawer/drawer.component';
import { Color } from 'src/app/shared/color.model';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  standalone: true,
  imports: [CommonModule, BingoGridComponent, DrawerComponent]
})
export class BingoComponent {
  public activeColor: Color = 'default';

  constructor(private storageService: StorageService) {}

  public changeColor(color: string):void {
    this.activeColor = color as Color;

    this.storageService.setItem('activeColor', color)
  }
}
