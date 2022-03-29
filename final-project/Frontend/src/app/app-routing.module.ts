import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PaymentsComponent } from './payments/payments.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CategoriesComponent } from './categories/categories.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RegistrationComponent } from './registration/registration.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutUsComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'login', component: AuthorizationComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'account', component: AccountInfoComponent},
  {path: 'payment', component: PaymentsComponent},
  {path: 'product/:id', component: FoodDetailComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }