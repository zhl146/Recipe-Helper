import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipebook/recipe.model';

@Injectable()
export class AppHttpService {

  token: string;
  databaseUrl = 'https://recipebook-1b98a.firebaseio.com/';

  constructor( private http: Http,
               private auth: AuthService) { }

  // not the most secure way to do it, but this allows each user to have their own
  // database files
  getUrl(route): string {
    const userEmail = this.auth.getUserEmail().replace(/[^a-zA-Z0-9]/g, '_');
    return this.databaseUrl + userEmail + route + '.json?auth=' + this.token;
  }

  genericPut(route: string, data: any) {
    this.token = this.auth.getToken();
    const url = this.getUrl(route);
    return this.http.put(url, data);
  }

  genericPost(route: string, data: any) {
    this.token = this.auth.getToken();
    const url = this.getUrl(route);
    return this.http.post(url, data);
  }

  genericGet(route: string) {
    this.token = this.auth.getToken();
    const url = this.getUrl(route);
    return this.http.get(url);
  }

  saveRecipes(data: Recipe[]) {
      return this.genericPut('recipes', data);
  }

  getRecipes() {
    return this.genericGet('recipes')
      .map(
        (data: Response) => {
          return data.json();
        }
      );
  }

  saveList(data: string[]) {
      return this.genericPut('list', data);
  }

  getList() {
    return this.genericGet('list')
      .map(
        (data: Response) => {
          return data.json();
        }
      );
  }

}
