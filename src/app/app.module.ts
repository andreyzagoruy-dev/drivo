import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@services/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './views/login/login.component';
import { PlacesSuggestComponent } from './components/places-suggest/places-suggest.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { TripsComponent } from './views/trips/trips.component';
import { AddTripComponent } from './views/add-trip/add-trip.component';
import { InputListenerDirective } from './directives/input-listener.directive';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent,
    PlacesSuggestComponent,
    SignUpComponent,
    TripsComponent,
    AddTripComponent,
    ProfileComponent,
    SignUpComponent,
    InputListenerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
