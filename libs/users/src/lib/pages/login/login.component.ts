import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = "Email or password are wrong!";

  constructor( 
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm(){
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  };

  onSubmit(){
    this.isSubmitted = true;

    if(this.loginFormGroup.invalid){
      return;
    }

    const loginData = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value
    }

    this.auth.login( loginData.email, loginData.password).subscribe( user => {
      this.authError = false;
      this.localstorageService.setToken(user.token);
      this.router.navigate(['/'])  //si email y contraseña estan bien te lleva al homepage del admin panel
    }, 
    (error: HttpErrorResponse) => {
      this.authError = true;
      if(error.status !== 400){
        this.authMessage = 'Error in the server, please try again later'
      }
    })
  }

  get loginForm(){
    return this.loginFormGroup.controls;
  }

}
