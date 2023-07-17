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

  isListActive: boolean = false;

  currentActiveItem: number = 0;

  userNamesToHighlight: string[] = [];

  private onTouch: Function = () => {};

  private onModelChange: Function = () => {};

  @ViewChild("backdrop") $backdrop!: ElementRef<HTMLDivElement>;
  @ViewChild("textarea") $textarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild("highlight") $hightlightBox!: ElementRef<HTMLDivElement>;

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

    // if(this.userNamesToHighlight && text) {
    //   text = text.replace(new RegExp(this.userNameToHighlight), '<span class="highlight">$&</span>');
    // }

    this.userNamesToHighlight.forEach(user => {
      text = text
      .replace(new RegExp(user, 'g'), '<span class="highlight">$&</span>');
    });
    return text;
    
  }

  handleScroll() {
    const scrollTop = this.$textarea.nativeElement.scrollTop;
    this.$backdrop.nativeElement.scrollTop = scrollTop;

    const scrollLeft = this.$textarea.nativeElement.scrollLeft;
    this.$backdrop.nativeElement.scrollLeft = scrollLeft;
  }

  handleSuggestionBox(isActive: boolean, suggestionList: HTMLDivElement) {
    this.isListActive = isActive;
    this.focusListItem(suggestionList);
  }

  navigateList(event: KeyboardEvent, suggestionList: HTMLDivElement) {
    switch(event.keyCode) {
      case 38:
        if(this.currentActiveItem !== 0) {
          this.currentActiveItem--;
          this.focusListItem(suggestionList, this.currentActiveItem);
        }
        return;

      case 40:
        if(this.currentActiveItem < this.users.length) {
          this.currentActiveItem++;
          this.focusListItem(suggestionList, this.currentActiveItem)
        }
        return;

      default:
        return;
    }
  }

  focusListItem(suggestionList: HTMLDivElement, index: number = 0) {
    setTimeout(() => {
      if(this.isListActive) {
        const firstButton = suggestionList.querySelector(`#suggestion-item-${index}`);
        if (firstButton) {
          (firstButton as HTMLButtonElement).focus();
        }
      }
    }, 100);
  }

  addToTextArea(username: string) {
    this.value = this.value.substring(0, this.$textarea.nativeElement.selectionStart - 1) + username + "  ";
    if(!this.userNamesToHighlight.includes(username)) {
      this.userNamesToHighlight.push(username);
    }
    this.isListActive = false;
    this.$textarea.nativeElement.focus();
  }

}
