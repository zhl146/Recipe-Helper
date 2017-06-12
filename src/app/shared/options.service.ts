import { Injectable } from '@angular/core';
import { AppHttpService } from './http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OptionsService {

  private optionsObs = new BehaviorSubject<{
    recipeInfo: boolean,
    shoppingInfo: boolean
  }>({
    recipeInfo: true,
    shoppingInfo: true
  });

  constructor( private http: AppHttpService ) { }

  getOptionsObs() {
    return this.optionsObs.asObservable();
  }

  getOptions() {
    return this.optionsObs.getValue();
  }

  updateOptions(options) {
    this.optionsObs.next(options);
  }

  updateDatabase() {
    return new Promise(
      (resolve) => {
        this.http.saveOptions(this.optionsObs.getValue()).subscribe(
          () => {
            resolve();
          }
        );
      });
  }

  getOptionsFromServer() {
    this.http.getOptions()
      .subscribe(
        (serverOptions) => {
          if (serverOptions) {
            this.optionsObs.next(serverOptions);
          } else {
            this.optionsObs.next(
              {
                recipeInfo: true,
                shoppingInfo: true
              }
            );
          }
        }
      );
  }

}
