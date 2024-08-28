import { InjectionToken } from '@angular/core';

export interface EnvironmentConfig {
  baseUrl: string;
  production: boolean;
}

export const ENV_CONFIG = new InjectionToken<EnvironmentConfig>('ENV_CONFIG');
