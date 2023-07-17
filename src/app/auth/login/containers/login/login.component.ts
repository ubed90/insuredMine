import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async loginUser(event: FormGroup) {
    const { userId , password } = event.value;

    this.auth.loginUser(userId, password).subscribe(
      (data) => {
        this.router.navigate(['/'])
      },
      (error) => {
        this.error = error.message
      }
    )
  }

}
