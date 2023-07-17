import { Component, ElementRef, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { User } from 'src/app/auth/shared/model/user.model';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaHighlightComponent),
  multi: true
}


@Component({
  selector: 'app-textarea-highlight',
  templateUrl: './textarea-highlight.component.html',
  styleUrls: ['./textarea-highlight.component.scss'],
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class TextareaHighlightComponent implements OnInit, ControlValueAccessor {

  @Input()
  users: User[] = [];

  value: string = '';

  firstIteration: boolean = true;

  private onTouch: Function = () => {};

  private onModelChange: Function = () => {};

  @ViewChild("backdrop") $backdrop!: ElementRef<HTMLDivElement>;
  @ViewChild("textarea") $textarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild("highlight") $hightlightBox!: ElementRef<HTMLTextAreaElement>;

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(value: string): void {
    if(value != undefined){
      this.value = value;
    } 
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  get highlightedUsernames() {
    return this.applyHighlight(this.value);
  }

  applyHighlight(text: string): string {
    text = text ? text
      .replace(/\n$/g, "\n\n") : '';

    // text = text ? 
    //       text.substring(0, this.$textarea.nativeElement.selectionStart) : '';
    this.users.forEach(user => {
      text = text
      .replace(new RegExp(user.username, 'g'), '<span class="highlight">$&</span>');
    });
    return text;
    
  }

  handleScroll() {
    const scrollTop = this.$textarea.nativeElement.scrollTop;
    this.$backdrop.nativeElement.scrollTop = scrollTop;

    const scrollLeft = this.$textarea.nativeElement.scrollLeft;
    this.$backdrop.nativeElement.scrollLeft = scrollLeft;
  }

  calculateRowNumber() {
    const { offsetHeight } = this.$hightlightBox.nativeElement;
    const { lineHeight } = window.getComputedStyle(this.$hightlightBox.nativeElement);
    const rowNumber = Math.round(offsetHeight / +lineHeight.replace('px', ''));
    const charsPerRow = Math.round(this.applyHighlight(this.value).length / rowNumber);
    const lastRowChars = this.applyHighlight(this.value).substring((charsPerRow - +this.$textarea.nativeElement.style.paddingLeft.replace("px", "") + +this.$textarea.nativeElement.style.paddingRight.replace("px", ""))*(rowNumber-1))
    console.log(lastRowChars);

    // this.$textarea.nativeElement.setSelectionRange(0, this.$textarea.nativeElement.value.length, "forward");
  }

  handleSuggestionBox(isActive: boolean, suggestionList: HTMLDivElement) {
    if(isActive) {
      // (suggestionList.firstElementChild as HTMLButtonElement).focus();
      // this.calculateRowNumber();
    }
    // console.log(this.$hightlightBox.nativeElement.clientHeight, this.$hightlightBox.nativeElement.offsetHeight);
  }

}
