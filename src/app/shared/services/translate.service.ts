import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguegeServices {
  constructor(private translate: TranslateService) {}

  translateOptions(
    options: any[],
    translationKeys: string[],
    key = 'name'
  ): Observable<any[]> {
    return this.translate.stream(translationKeys).pipe(
      map((res: any) => {
        return options.map((option) => ({
          ...option,
          [key]: res[option.name || option.label],
          defName: option.name || option.label,
        }));
      })
    );
  }
}
