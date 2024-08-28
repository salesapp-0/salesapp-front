import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {environment} from "../environments/environment";
import {ENV_CONFIG} from "./core/configs/environment.config";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[
    { provide: ENV_CONFIG, useValue: environment },
  ]
})
export class AppComponent {
  title = environment.baseUrl;
}
