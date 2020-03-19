import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';
 import { NewUser } from '@models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: NewUser;

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit() { }

  private isCheckPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.signUpForm && control.value !== this.signUpForm.value.password) {
        return { required: false };
      }
      return null;
    };
  };

  signUpForm = new FormGroup({
    'email': new FormControl('test@gmail.ua', [Validators.required, Validators.email]),
    'password': new FormControl('123456', [Validators.required, Validators.minLength(6)]),
    'confirmPassword': new FormControl ('123456', [Validators.required, this.isCheckPassword()]),
  });

  get email() {
    return this.signUpForm.get('email');
  };

  get password() {
    return this.signUpForm.get('password');
  };

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  };

  add (user: NewUser) {
    this.api.addUser(user.email.trim(), user.password.trim()).subscribe((data: Record<string, any>) => {
      if (data.user_id) {
        this.auth.saveUser(data);
      }
    });
  }

  onSubmit() {
    this.add(this.signUpForm.value);
  }
}
