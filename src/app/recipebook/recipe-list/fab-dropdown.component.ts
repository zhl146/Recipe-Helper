import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { RecipeBookDataService } from '../../shared/recipe-book-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fab-dropdown',
  templateUrl: './fab-dropdown.component.html',
  styleUrls: ['./fab-dropdown.component.scss']
})
export class FabDropdownComponent {

  @Input() index: number;

  menuIcon = 'more_horiz';
  menuColor = 'accent';

  menuOpen = false;
  deleteConfirmButton = false;

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.elRef.nativeElement.contains(targetElement);
    if ( clickedInside && this.deleteConfirmButton === true) {
      this.menuOpen = true;
      this.deleteConfirmButton = false;
      this.menuIcon = 'more_horiz';
      this.menuColor = 'accent';
    } else if (clickedInside ) {
      this.menuOpen = !this.menuOpen;
    } else {
      this.menuOpen = false;
    }
  }

  constructor( private router: Router,
               private recipeService: RecipeBookDataService,
               private elRef: ElementRef ) { }

  onDeleteAttempt() {
    this.deleteConfirmButton = true;
    this.menuIcon = 'replay';
    this.menuColor = 'primary';
  }

  onDeleteConfirm() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['/recipes']);
  }

  onFavorite() {
    this.recipeService.toggleRecipeFav(this.index);
    this.menuOpen = false;
    console.log('favorite');
  }

  onEdit() {
    this.router.navigate(['recipes', this.index, 'edit']);
    this.menuOpen = false;
  }

}
