import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appSideMenu]',
  standalone: true,
})
export class SideMenuDirective {
  @Input() menuOpenClass = 'open';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  toggleMenu() {
    if (this.el.nativeElement.classList.contains(this.menuOpenClass)) {
      this.renderer.removeClass(this.el.nativeElement, this.menuOpenClass);
    } else {
      this.renderer.addClass(this.el.nativeElement, this.menuOpenClass);
    }
  }
}

@Directive({
  selector: '[appMenuToggle]',
  standalone: true,
})
export class MenuToggleDirective {
  constructor(private sideMenu: SideMenuDirective) {}

  @HostListener('click')
  onClick() {
    this.sideMenu.toggleMenu();
  }
}
