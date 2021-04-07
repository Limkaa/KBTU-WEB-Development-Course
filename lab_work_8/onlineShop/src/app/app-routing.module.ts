import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent} from './categories/categories.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';

const routes: Routes = [
	{path: 'categories', component: CategoriesComponent},
	{path: 'categories/:id', component: ProductListComponent},
	{path: 'products/:id', component: ProductItemComponent},
	{path: '', redirectTo: 'categories', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
