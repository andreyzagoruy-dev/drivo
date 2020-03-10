import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { CreateProfileComponent } from '@views/create-profile/create-profile.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: CreateProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
