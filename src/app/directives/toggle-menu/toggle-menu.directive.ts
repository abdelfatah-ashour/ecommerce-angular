import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'button[appToggleMenu]',
  standalone: true,
})
export class ToggleMenuDirective {
  constructor(private elementRef: ElementRef) { }


  toggleMenu(){
    this.elementRef.nativeElement.setAttribute('aria-expanded', 'true');
  }
}
