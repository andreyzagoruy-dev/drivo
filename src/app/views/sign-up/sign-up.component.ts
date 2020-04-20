import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { tap, switchMap } from 'rxjs/operators';
import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';
import { UnauthorizedUser } from '@models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  user: UnauthorizedUser;

  signUpForm = new FormGroup({
    email: new FormControl('test@gmail.ua', [Validators.required, Validators.email]),
    password: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('123456', [Validators.required, this.isCheckPassword()])
  });

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private storage: StorageService,
    private router: Router
  ) { }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  public add(user: UnauthorizedUser) {
    this.api.addUser(user.email.trim(), user.password.trim())
      .pipe(
        tap(this.auth.saveUser),
        switchMap((createdUser) => this.api.getUserById(createdUser.id))
      )
      .subscribe((userFromServer) => {
        this.storage.setItem('userProfile', userFromServer);
        this.router.navigate(['profile']);
      });
  }

  public onSubmit() {
    this.add(this.signUpForm.value);
  }

  private isCheckPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.signUpForm && control.value !== this.signUpForm.value.password) {
        return { required: false };
      }
      return null;
    };
  }
}
