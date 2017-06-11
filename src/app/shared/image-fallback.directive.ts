import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]',
  // when I replace this with the equivalent hostbinding
  // it doesn't seem to work
  // will look into this later
  host: {
    '[src]': 'src'
  }
})
export class ImageFallbackDirective {
  @Input() appImgFallback: string;
  @Input() src: string;

  @HostListener('error') updateUrl(event) {
    this.src = this.appImgFallback;
  };
}
