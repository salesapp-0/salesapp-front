import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss',
})
export class CardInfoComponent {
  @Input() colorType = '';
  @Input() title = '';
  @Input() value = 0;
  @Input() icon = '';
}
