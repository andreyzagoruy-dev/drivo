import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { CreateProfileComponent } from '@views/create-profile/create-profile.component';
import { SignUpComponent } from '@views/sign-up/sign-up.component';
import { AuthGuard } from '@services/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: CreateProfileComponent, canActivate: [AuthGuard]},
  { path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
