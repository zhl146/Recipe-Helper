import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipebookService} from '../recipebook.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] | Observable<Recipe[]>;

  constructor( private recipeService: RecipebookService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  // shows the current recipe detail
  onSelected(index: number) {
    this.router.navigate([index], {relativeTo: this.route});
  }

}
