import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.auth$.pipe(
        map(user => {
          if(!user) {
            return this.router.createUrlTree(['/auth/login'])
          }

          if(route.data['isPrivate'] && !user.isPrivate) {
            return this.router.createUrlTree(['/invalid']);
          }

          return !!user;
        }) 
      )
  }
  
}
