import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/ui/header/header.component';
import { SidebarComponent } from '../../../shared/ui/sidebar/sidebar.component';

@Component({
  selector: 'app-soft-settings',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './soft-settings.component.html',
  styleUrl: './soft-settings.component.scss',
})
export class SoftSettingsComponent {}
