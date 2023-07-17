import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/auth/shared/model/user.model';
import { DataService } from 'src/app/shared/services/data.service';
import { Store } from 'store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users$!: Observable<User[]>;
  usersSubscription$!: Subscription;

  textAreaValue: string = '';

  constructor(private store: Store, private dataService: DataService) {}

  ngOnInit(): void {
    this.users$ = this.store.select<User[]>('users');
    this.usersSubscription$ = this.dataService.getUsers().subscribe();
  }

}
