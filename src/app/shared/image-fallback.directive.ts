import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appDivImage]'
})
export class ImageFallbackDirective implements OnChanges {
  // this directive dynamically applies a background image to a div

  // src is the url of the image passed in through the template
  // probably using string interpolation
  @Input() src: string;

  // a separate url for a fallback image
  @Input() fallback: string;

  // we bind to the background image css style
  @HostBinding('style.background-image') backgroundStyle;

  ngOnChanges() {
    // check if we can resolve the src url
    // if we can't, then use the (probably local) fallback
    this.checkImage(this.src,
      () => {
        this.backgroundStyle = 'url(' + this.src + ')';
      },
      () => {
        this.backgroundStyle = 'url(' + this.fallback + ')';
      }
    );

  }

  // checks if the image src is reachable
  checkImage(imageSrc, success, error) {
    const img = new Image();
    img.onload = success;
    img.onerror = error;
    img.src = imageSrc;
  }
}
