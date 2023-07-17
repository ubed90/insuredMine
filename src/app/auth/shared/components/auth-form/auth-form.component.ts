import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  register: boolean = false;

  @Input()
  set isRegister(param: boolean) {
    if(param) {
      this.form = this.fb.group({
        userId: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required]
      })

      this.register = true;
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  @Output()
  submitted = new EventEmitter<FormGroup>()

  form: FormGroup = this.fb.group({
    userId: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if(this.form.valid) {
      this.submitted.emit(this.form)
    }
  }


  get passwordInvalid() {
    const control = this.form.get('password');
    return control?.touched && control.hasError('required');
  }

  get userNameRequired() {
    const control = this.form.get('username');
    return control?.touched && control.hasError('required');
  }

  get userIdRequired() {
    const control = this.form.get('userId');
    return control?.touched && control.hasError('required');
  }

}
