import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() index: number;
  @Input() recipeItem: Recipe;

  constructor( private router: Router,
               private route: ActivatedRoute ) {}

  ngOnInit() {

  }
}
