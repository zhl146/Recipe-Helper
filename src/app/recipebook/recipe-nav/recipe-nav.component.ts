import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { RecipeBookNavService } from '../recipe-book-nav.service';

@Component({
  selector: 'app-recipe-nav',
  templateUrl: './recipe-nav.component.html',
  styleUrls: ['./recipe-nav.component.scss']
})
export class RecipeNavComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject<any>();
  public currentRecipeIndex: number | null = null;

  constructor( private recipeNavService: RecipeBookNavService ) { }

  ngOnInit() {
    this.recipeNavService.getCurrentRecipeObs()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (currentRecipeIndex) => {
          this.currentRecipeIndex = currentRecipeIndex;
        }
      );
  }

  // take care of memory leak
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onNavNext() {
    this.recipeNavService.onNavigateNext();
  }

  onNavBack() {
    this.recipeNavService.onNavigateBack();
  }

  onNavStop() {
    this.recipeNavService.onNavigateStop();
  }

}
