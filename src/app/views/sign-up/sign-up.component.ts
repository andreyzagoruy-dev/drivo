import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { SignUpService } from '@services/sign-up.service'
import { NewUser } from '@models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: NewUser

  constructor(
    private signUpService: SignUpService
  ) { }

  ngOnInit() { }

  private isCheckPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.singUpForm && control.value !== this.singUpForm.value.password) {
        return {required: false}
      }
      return null;
    };
  };

  singUpForm = new FormGroup({
    'email': new FormControl('des@dd', [Validators.required, Validators.email]),
    'password': new FormControl('123456  ', [Validators.required, Validators.minLength(6)]),
    'confirmPassword': new FormControl ('123456  ', [Validators.required, this.isCheckPassword()]),
  });

  get email() { return this.singUpForm.get('email')};

  get password() {return this.singUpForm.get('password')};

  get confirmPassword() {return this.singUpForm.get('confirmPassword')};

  onSubmit(){
    this.add(this.singUpForm.value);
  }

  add( user ){
    const email = user.email.trim();
    const password = user.password.trim();

    const newUser = {email, password} as NewUser;
    console.log(newUser);
    this.signUpService.addUser(newUser)
  }
}
