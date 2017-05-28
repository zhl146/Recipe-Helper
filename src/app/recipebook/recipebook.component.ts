import { Component } from '@angular/core';

import {RecipebookService} from './recipebook.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipebook.component.html',
  styleUrls: ['./recipebook.component.css'],
  providers: [RecipebookService]
})

export class RecipeBookComponent {
}
