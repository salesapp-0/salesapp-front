import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./shared/services/auth.service";
import {HttpService} from "./core/http";
import {EnvironmentService} from "./shared/services/envirment.service";
import {environment} from "../environments/environment";
import {ENV_CONFIG} from "./core/configs/environment.config";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(
      [BrowserAnimationsModule],
      HttpClientModule,
    ),
    AuthService,EnvironmentService,
    { provide: ENV_CONFIG, useValue: environment },
  ]
};
