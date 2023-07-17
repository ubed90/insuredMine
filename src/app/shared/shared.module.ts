import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { DataService } from './services/data.service';
import { InvalidComponent } from './components/invalid/invalid.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TextareaHighlightComponent } from './components/textarea-highlight/textarea-highlight.component';
import { FormsModule } from '@angular/forms';
import { TextareaDirective } from './directives/input/textarea.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    InvalidComponent,
    LoadingComponent,
    TextareaHighlightComponent,
    TextareaDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InvalidComponent,
    LoadingComponent,
    TextareaHighlightComponent,
    FormsModule,
    TextareaDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [DataService]
    }
  }
}
