import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppLayoutModule } from './layout/app.layout.module';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TestComponent } from "./pages/test/test.component";
import { ClienteTelefonoPipe } from './formato/cliente-telefono.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ClienteTelefonoPipe
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    AppLayoutModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    TestComponent
],
  providers: [ provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
