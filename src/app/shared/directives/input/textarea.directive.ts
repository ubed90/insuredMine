import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextarea]'
})
export class TextareaDirective {

  @HostBinding('class.openSuggestions') isActive: boolean = false;

  constructor(private el: ElementRef<HTMLTextAreaElement>, private renderer: Renderer2) { }

  @HostListener('input', ['$event'])
  toggleList(event: InputEvent) {
    const { data: letter } = event;

    this.isActive = letter === '@' ? true : false;
    console.log(this.el.nativeElement.value.indexOf("\n"));
    console.log(event);

    if(this.isActive) {
      (this.el.nativeElement.nextSibling?.firstChild as HTMLButtonElement).focus();
    }
  }
}
