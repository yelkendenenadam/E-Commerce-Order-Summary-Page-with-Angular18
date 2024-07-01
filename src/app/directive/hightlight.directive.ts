import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHightlight]',
  standalone: true
})
export class HightlightDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'lightblue';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = 'lightgreen';
  }

}
