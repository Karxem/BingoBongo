import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputComponent } from 'src/app/components/input/input.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, InputComponent]
})
export class HomeComponent {

}
