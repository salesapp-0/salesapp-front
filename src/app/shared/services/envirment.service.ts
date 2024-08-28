import {Inject, Injectable} from '@angular/core';
import {ENV_CONFIG, EnvironmentConfig} from "../../core/configs/environment.config";

@Injectable()
export class EnvironmentService {

  constructor(@Inject(ENV_CONFIG) public readonly config: EnvironmentConfig) {
    console.log(config)
  }
}
