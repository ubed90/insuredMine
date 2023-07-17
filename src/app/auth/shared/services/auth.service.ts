import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Store } from 'store';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

interface AuthResponse {
  userId: string;
  username: string;
  isPrivate: boolean;
  password?: string
}

@Injectable()
export class AuthService {

  auth$: Observable<User>;

  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store, private http: HttpClient) {
    this.auth$ = this.store.select<User>('user');
    this.isAuthenticated$ = this.auth$.pipe(
      map(user => !!user)
    )
  }

  createUser(userId: string, username: string, password: string, isPrivate: boolean = false) {
    return this.http.post<AuthResponse>('/users', { userId, username, password, isPrivate }).pipe(
      catchError((error) => throwError(() => error)),
      tap((data) => {
        this.handleAuth(
          data.userId,
          data.username,
          data.isPrivate
        )
      })
    )
  }

  loginUser(userId: string, password: string) {
    return this.http.get<AuthResponse[]>(`/users?userId=${userId}`).pipe(
      catchError((error) => throwError(() => error)),
      tap((data) => {
        if(data && data[0].password && data[0].password !== password) {
          throw new Error('Invalid UserId or password')
        }

        this.handleAuth(
          data[0].userId,
          data[0].username,
          data[0].isPrivate
        )
      })
    )
  }

  handleAuth(userId: string, username: string, isPrivate: boolean) {
    const user: User = new User(userId, username, isPrivate);
    this.store.set('user', user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  autoLogin() {
    const user: User = JSON.parse(<string>localStorage.getItem('user'));

    if (!user) {
      return this.store.set('user', undefined);
    }

    const loadedUser = new User(
      user.userId,
      user.username,
      user.isPrivate
    );

    return this.store.set('user', loadedUser);
  }

  logout() {
    console.log('User Logged Out');
    this.store.set('user', undefined);
    localStorage.removeItem('user');
  }
}
