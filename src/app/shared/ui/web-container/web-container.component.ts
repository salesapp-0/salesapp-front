import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-web-container',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './web-container.component.html',
  styleUrl: './web-container.component.scss',
})
export class WebContainerComponent {}
