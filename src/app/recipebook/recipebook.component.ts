import { Component, OnInit } from '@angular/core';
import { ShoppinglistService } from '../shoppinglist/shoppinglist.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipebook.component.html',
  styleUrls: ['./recipebook.component.css']
})

export class RecipeBookComponent implements OnInit {

  constructor( private shoppingService: ShoppinglistService) {}

  ngOnInit() {
    this.shoppingService.getServerList();
  }
}
