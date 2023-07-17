import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { User } from 'src/app/auth/shared/model/user.model';
import { Store } from 'store';

@Injectable()
export class DataService {

  constructor(private store: Store, private http: HttpClient) {}


  getUsers() {
    return this.http.get<User[]>('/users').pipe(
      catchError((error) => throwError(() => error)),
      tap(users => {
        if(!users) {
          return this.store.set('users', [])
        }

        this.store.set('users', users);
      })
    )
  }
}
