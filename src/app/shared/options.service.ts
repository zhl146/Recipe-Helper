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

  getLocalOptions() {
    return this.optionsObs.getValue();
  }

  disableRecipeInfo() {
    const options = this.optionsObs.getValue();
    options.recipeInfo = false;
    this.optionsObs.next( options );
  }

  disableShoppingInfo() {
    const options = this.optionsObs.getValue();
    options.shoppingInfo = false;
    this.optionsObs.next( options );
  }

  updateLocalOptions(options) {
    this.optionsObs.next(options);
  }

  updateServerOptions() {
    return new Promise(
      (resolve) => {
        this.http.saveOptions(this.optionsObs.getValue()).subscribe(
          () => {
            resolve();
          }
        );
      });
  }

  getServerOptions() {
    return new Promise(
      (resolve) => {
        this.http.getData('options')
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
              resolve(serverOptions);
            }
          );
      }
    );
  }

}
