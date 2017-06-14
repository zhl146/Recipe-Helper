import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appDivImage]'
})
export class ImageFallbackDirective implements OnChanges {
  @Input() src: string;
  @Input() fallback: string;

  @HostBinding('style.background-image') backgroundStyle;

  ngOnChanges() {
    this.checkImage(this.src,
      () => {
        this.backgroundStyle = 'url(' + this.src + ')';
      },
      () => {
        this.backgroundStyle = 'url(' + this.fallback + ')';
      }
    );

  }

  checkImage(imageSrc, success, error) {
    const img = new Image();
    img.onload = success;
    img.onerror = error;
    img.src = imageSrc;
  }
}
