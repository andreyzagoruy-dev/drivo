import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { CreateProfileComponent } from '@views/create-profile/create-profile.component';
import { SingUpComponent } from '@views/sing-up/sing-up.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: CreateProfileComponent},
  { path: 'sing-up', component: SingUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
