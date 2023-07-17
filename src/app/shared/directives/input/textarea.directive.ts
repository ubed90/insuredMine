import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appTextarea]'
})
export class TextareaDirective {

  @Output() suggestionListEvent: EventEmitter<boolean> = new EventEmitter();

  isActive: boolean = false;

  constructor(private el: ElementRef<HTMLTextAreaElement>) { }

  @HostListener('input', ['$event'])
  toggleList(event: InputEvent) {
    const { data: letter } = event;

    this.isActive = letter === '@' ? true : false;

    this.suggestionListEvent.emit(this.isActive)
  }
}
