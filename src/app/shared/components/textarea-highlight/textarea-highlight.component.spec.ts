import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaHighlightComponent } from './textarea-highlight.component';

describe('TextareaHighlightComponent', () => {
  let component: TextareaHighlightComponent;
  let fixture: ComponentFixture<TextareaHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaHighlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareaHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
