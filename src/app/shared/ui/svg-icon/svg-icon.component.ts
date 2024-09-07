import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})
export class SvgIconComponent {
  @Input() width: string = '100px';
  @Input() height: string = '100px';
  @Input() color: string = '#000'; 
  @Input() viewBox: string = '0 0 100 100';
  @Input() path: string = ''; 
}
