import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  profileForm = this.fb.group({
    name: [''],
    email: [''],
    tel: [''],
    car: [''],
    workAddress: [''],
    homeAddress: [''],
  })

  workLocation(location) {
    return this.profileForm.value.workAddress = location;
  };

  homeLocation(location) {
    return this.profileForm.value.homeAddress = location;
  };

  onSubmit() {
    console.warn(this.profileForm.value);
  }

}
