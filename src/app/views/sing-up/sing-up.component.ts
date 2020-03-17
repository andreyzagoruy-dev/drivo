import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

// import { UserSingUp } from '@models/user';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  constructor( ) { }

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
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    'confirmPassword': new FormControl ('', [Validators.required, this.isCheckPassword()]),
  });

  get email() { return this.singUpForm.get('email')};

  get password() {return this.singUpForm.get('password')};

  get confirmPassword() {return this.singUpForm.get('confirmPassword')};

  onSubmit(){
    console.log(this.singUpForm.value)
  }
}
