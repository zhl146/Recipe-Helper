import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';
import { ShoppinglistService } from '../../shared/shoppinglist.service';
import { RecipebookService } from '../../shared/recipebook.service';
import { OptionsService } from '../../shared/options.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  signInSubscription: Subscription;

  constructor ( private auth: AuthService,
                private shoppingService: ShoppinglistService,
                private recipesService: RecipebookService,
                private optionsService: OptionsService ) {}

  ngOnInit() {
    this.signInSubscription = this.auth.getSignedIn()
      .subscribe(
        (signInState) => {
          if (signInState) {
            this.shoppingService.getServerList();
            this.recipesService.getServerRecipes();
            this.optionsService.getServerOptions();
          } else {

          }
        }
      );
  }

  ngOnDestroy() {
    this.signInSubscription.unsubscribe();
  }

}
