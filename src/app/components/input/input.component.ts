import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class InputComponent {
  @Input({ required: true }) label: string = '';
  @Input({required: true }) placeholder: string = '';
  @Input({ required: true }) inputType: string = 'text';
}
