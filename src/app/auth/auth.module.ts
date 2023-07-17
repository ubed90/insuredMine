import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as PrivateSharedModule} from './shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrivateSharedModule.forRoot()
  ]
})
export class AuthModule { }
