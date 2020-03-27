import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './views/login/login.component';
import { PlacesSuggestComponent } from './components/places-suggest/places-suggest.component';
import { CreateProfileComponent } from './views/create-profile/create-profile.component';
import { AuthInterceptor } from '@services/auth.interceptor';
import { SignUpComponent } from './views/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent,
    PlacesSuggestComponent,
    CreateProfileComponent,
    SignUpComponent
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
