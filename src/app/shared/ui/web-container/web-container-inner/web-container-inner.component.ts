import { Component, Input } from '@angular/core';
import { AddButtonComponent } from '../../add-button/add-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-web-container-inner',
  standalone: true,
  imports: [
    AddButtonComponent,
    TranslateModule,
    InputTextModule,
    DropdownModule,
    CommonModule,
    CheckboxModule,
  ],
  templateUrl: './web-container-inner.component.html',
  styleUrl: './web-container-inner.component.scss',
})
export class WebContainerInnerComponent {
  @Input() padding = '16px';
}
