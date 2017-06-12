import { Component, OnDestroy, OnInit } from '@angular/core';
import { OptionsService } from '../../shared/options.service';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.scss']
})
export class OptionsDialogComponent implements OnInit, OnDestroy {

  options: {
    shoppingInfo: boolean,
    recipeInfo: boolean
  };

  constructor( private optionsService: OptionsService ) { }

  ngOnInit() {
    this.options = this.optionsService.getLocalOptions();
  }

  ngOnDestroy() {
    this.optionsService.updateLocalOptions(this.options);
  }

}
