import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvalidComponent } from '../shared/components/invalid/invalid.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadChildren: async () => (await import('./login/login.module')).LoginModule
      },
      {
        path: 'register',
        loadChildren: async () => (await import('./register/register.module')).RegisterModule
      }
    ]
  },
  {
    path: "**",
    component: InvalidComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
