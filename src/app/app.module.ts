import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '@services/loading.interceptor';
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
import { CarsComponent } from './views/cars/cars.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

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
    InputListenerDirective,
    CarsComponent,
    LoaderComponent,
    SidebarComponent,
    HeaderComponent
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
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
