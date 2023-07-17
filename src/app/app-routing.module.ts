import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/shared/guards/auth.guard';
import { InvalidComponent } from './shared/components/invalid/invalid.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: async () => (await import('./home/home.module')).HomeModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'gallery',
    loadChildren: async () => (await import('./gallery/gallery.module')).GalleryModule,
    canActivate: [AuthGuard],
    data: {
      isPrivate: true
    }
  },
  {
    path: 'about',
    loadChildren: async () => (await import('./about/about.module')).AboutModule,
  },
  {
    path: 'invalid',
    component: InvalidComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
