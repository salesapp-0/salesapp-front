import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {environment} from "../environments/environment";
import {ENV_CONFIG} from "./core/configs/environment.config";
import {AuthService} from "./shared/services/auth.service";
import {EnvironmentService} from "./shared/services/envirment.service";
import {HttpService} from "./core/http";
import {HttpClientModule} from "@angular/common/http";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ButtonModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[
    EnvironmentService,
    HttpService,
    AuthService,
    { provide: ENV_CONFIG, useValue: environment },
  ]
})
export class AppComponent {
  title = environment.baseUrl;
  private authService = inject(AuthService)
}
