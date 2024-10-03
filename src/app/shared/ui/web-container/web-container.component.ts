import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AddButtonComponent } from '../add-button/add-button.component';
import { WebContainerInnerComponent } from './web-container-inner/web-container-inner.component';

@Component({
  selector: 'app-web-container',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    AddButtonComponent,
    WebContainerInnerComponent,
  ],
  templateUrl: './web-container.component.html',
  styleUrl: './web-container.component.scss',
})
export class WebContainerComponent {}
