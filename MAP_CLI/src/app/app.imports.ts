import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent,LoginComponent,RegisterComponent } from './_components';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { ErrorInterceptor,JwtInterceptor } from "./_helpers";



export function tokenGetter() {
    return localStorage.getItem("user")["access_token"];
    
}

export const COMPONENTS : any[] = [
    LoginComponent,
    HomeComponent,
    RegisterComponent
];

export const MODULES : any[] = [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
   
];

export const PROVIDERS : any[] = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];