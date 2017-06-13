import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  private localUser = new BehaviorSubject<any>(null);
  private idToken = new BehaviorSubject<string>(null);

  localUserObs() {
    return this.localUser.asObservable();
  }

  localTokenObs() {
    return this.idToken.asObservable();
  }

  updateLocalUser(user) {
    this.localUser.next(user);
  }

  removeLocalUser() {
    this.localUser.next(null);
  }

  updateLocalToken(token: string) {
    this.idToken.next(token);
  }

  removeLocalToken() {
    this.idToken.next(null);
  }

  getCurrentToken() {
    return this.idToken.getValue();
  }

}
