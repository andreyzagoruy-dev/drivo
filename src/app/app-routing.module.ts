import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { CreateProfileComponent } from '@views/create-profile/create-profile.component';
import { SignUpComponent } from '@views/sign-up/sign-up.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: CreateProfileComponent},
  { path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
