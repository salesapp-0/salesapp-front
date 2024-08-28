import {Inject, Injectable} from '@angular/core';
import {ENV_CONFIG, EnvironmentConfig} from "../../core/configs/environment.config";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(@Inject(ENV_CONFIG) public readonly config: EnvironmentConfig) {}
}
