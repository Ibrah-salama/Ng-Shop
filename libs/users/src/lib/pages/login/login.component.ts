import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  authError = false;
  form: FormGroup = new FormGroup({});
  hidden = false;
  eye = 'eye';
  show = 'password';
  isSubmitted = false;
  authMessage = 'Email or password may be invalid!';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService:LocalstorageService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }
  private _initLoginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  showPassword() {
    this.hidden = !this.hidden;
    if (this.hidden) {
      this.eye = 'eye';
      this.show = 'text';
    } else {
      this.eye = 'eye-slash';
      this.show = 'password';
    }
  }

  get loginForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    this.authService
      .login(this.loginForm.email.value, this.loginForm.password.value)
      .subscribe(
        (res) => {
          this.authError = false;
          console.log(res);
          this.localStorageService.setToken(res.token)
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.authError = true;
          if (error.status === 404) {
            this.authMessage = 'User or email are invalid!';
          }else if(error.status === 401){
            this.authMessage = 'You are not authorized to login!';
          }else if(error.status != 400){
            this.authMessage = 'Error in the server, Please try again later!';
          }
        }
      );
  }
}
