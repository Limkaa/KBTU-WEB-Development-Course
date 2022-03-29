import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PaymentsComponent } from './payments/payments.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CategoriesComponent } from './categories/categories.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RegistrationComponent } from './registration/registration.component';
import { FooterComponent } from './footer/footer.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { HttpClientModule } from '@angular/common/http';
import {AuthInterceptor} from './auth-interceptor';

@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    AuthorizationComponent,
    AccountInfoComponent,
    ShoppingCartComponent,
    PaymentsComponent,
    AboutUsComponent,
    CategoriesComponent,
    FeedbackComponent,
    RegistrationComponent,
    FooterComponent,
    FoodDetailComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
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
