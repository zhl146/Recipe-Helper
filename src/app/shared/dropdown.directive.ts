import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})


// this directive adds the bootstrap dropdown functionality to a html element
// it does this by adding or removing the open class when clicked

export class DropdownDirective {

  constructor( private eref: ElementRef) {}

  // binds our local boolean to the open class on the element this directive
  // is attached to

  @HostBinding('class.open') openClass = false;

  // on host even click, toggles the boolean controlling the open class

  @HostListener('click') toggleMenu() {
    this.openClass = !this.openClass;
  }

  @HostListener('document: click') closeMenu() {
    if (!this.eref.nativeElement.contains(event.target)) {
      this.openClass = false;
    }
  }

}
