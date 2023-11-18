import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color } from 'src/app/shared/color.model';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input({ required: true }) label: string = 'Button';
  public activeColor: Color = 'default';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.activeColor = this.storageService.getItem('activeColor') as Color;
  }
}
