import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AppHttpService {

  databaseUrl = 'https://recipebook-1b98a.firebaseio.com/';

  constructor(private http: Http) { }

  genericPut(route: string, data: any) {
    const url = this.databaseUrl + route + '.json';
    return this.http.put(url, data);
  }

  genericPost(route: string, data: any) {
    const url = this.databaseUrl + route + '.json';
    return this.http.post(url, data);
  }

  genericGet(route: string) {
    const url = this.databaseUrl + route + '.json';
    return this.http.get(url);
  }

  saveRecipes(data) {
    return this.genericPut('recipes', data);
  }

  getRecipes() {
    return this.genericGet('recipes')
      .map(
        (data: Response) => {
          console.log('Current recipe response from server:');
          console.log(data.json());
          return data.json();
        }
      );
  }

  saveList(data) {
    return this.genericPut('list', data);
  }

  getList() {
    return this.genericGet('list')
      .map(
        (data: Response) => {
          console.log(data);
          return data.json();
        }
      );
  }

}
