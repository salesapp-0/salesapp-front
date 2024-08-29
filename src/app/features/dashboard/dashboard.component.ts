import { Component } from '@angular/core';
import {HeaderComponent} from "../../shared/ui/header/header.component";
import {SidebarComponent} from "../../shared/ui/sidebar/sidebar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
