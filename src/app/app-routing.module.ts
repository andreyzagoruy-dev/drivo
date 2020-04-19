import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@services/auth.guard';
import { UserProfileResolver } from '@services/user-profile.resolver'
import { TripRouteResolver } from '@services/trip-route.resolver';
import { SignUpComponent } from '@views/sign-up/sign-up.component';
import { LoginComponent } from '@views/login/login.component';
import { ProfileComponent } from '@views/profile/profile.component';
import { TripsComponent } from '@views/trips/trips.component';
import { AddTripComponent } from '@views/add-trip/add-trip.component';

const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],  resolve: { userProfile: UserProfileResolver }},
  { path: 'trips', component: TripsComponent, canActivate: [AuthGuard], resolve: { userProfile: UserProfileResolver }},
  { path: 'trips/add', component: AddTripComponent, canActivate: [AuthGuard], resolve: { userProfile: UserProfileResolver, tripRoute: TripRouteResolver }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
