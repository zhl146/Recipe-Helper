import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipebookService} from '../../shared/recipebook.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeForm: FormGroup;

  // this is 2 way bound to user input
  // user can filter the recipe list using this string
  filterString: string;

  recipes: Recipe[] | Observable<Recipe[]>;

  constructor( private recipeService: RecipebookService,
               private router: Router,
               private route: ActivatedRoute,
               private fb: FormBuilder) { }

  // get the recipe and initializes the form for filtering
  ngOnInit() {
    this.recipes = this.recipeService.getLocalRecipes();

    this.recipeForm = this.fb.group({
      filter: this.fb.control('')
    });
  }

  // shows the current recipe detail
  onSelected(index: number) {
    this.router.navigate([index], {relativeTo: this.route});
  }

  // clears the current user filter string
  clearFilter() {
    this.filterString = '';
  }

}
