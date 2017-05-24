import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number; // array id of the recipe we are looking at if we are editing
  editMode = false; // true if we are editing an existing recipe false if we are creating a new one

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; // stores id so that we can use it to get recipe to edit later
          this.editMode = params['id'] != null; // sets the editing mode depending on whether we were passed params
        }
      );

  }

}
