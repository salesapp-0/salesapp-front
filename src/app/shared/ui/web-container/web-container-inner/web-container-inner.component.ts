import { Component, Input, signal } from '@angular/core';
import { AddButtonComponent } from '../../add-button/add-button.component';
import { containerConfig, SectionType } from '../helper/config';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
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
  @Input() sectionType!: SectionType;
  cConfig = containerConfig;
}
