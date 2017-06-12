import { Component, OnDestroy, OnInit } from '@angular/core';
import { OptionsService } from '../../shared/options.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit, OnDestroy {

  recipeInfo;
  optionsSub: Subscription;

  constructor( private optionsService: OptionsService ) {}

  ngOnInit() {
    this.optionsSub = this.optionsService.getOptionsObs()
      .subscribe(
        (options) => {
          this.recipeInfo = options.recipeInfo;
        }
      );
  }

  ngOnDestroy() {
    this.optionsSub.unsubscribe();
  }
}
