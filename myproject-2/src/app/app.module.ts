import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ToursdetailComponent } from './components/toursdetail/toursdetail.component';
import { CategoryToursComponent } from './components/category-tours/category-tours.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { CartComponent } from './components/cart/cart.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { P404Component } from './p404/p404.component';
import { BlogComponent } from './blog/blog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ToursdetailComponent,
    CategoryToursComponent,
    FavouriteComponent,
    CartComponent,
    AboutComponent,
    ContactComponent,
    P404Component,
    BlogComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
