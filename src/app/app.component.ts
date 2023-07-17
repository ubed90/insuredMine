import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from 'store';
import { User } from './auth/shared/model/user.model';
import { AuthService } from './auth/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'insuredMine';

  user$!: Observable<User>

  constructor(private authService: AuthService, private store: Store) {
    this.authService.autoLogin();
  }

  ngOnInit(): void {
    this.user$ = this.store.select<User>('user');
  }
}
