import { Component, OnInit } from '@angular/core';
import { Category, Product } from '../category';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories: Category[] = [];
  public products: Product[] = [];
  public category: Category;
  public IsCatalog = true;
  public BuyFood: number[]=[];
  constructor( private categoryService: CategoryService ) { }

  ngOnInit() {
    this.getCategories();
  }

  ChangeStatus(catalog1: Category){
    this.category= catalog1;
    this.IsCatalog = !this.IsCatalog;
    if(this.IsCatalog==false){
      this.getProducts();
    }
  }
  getCategories(){
    this.categoryService.getCategories().subscribe((data)=>{
      this.categories = data;
    });
  }
  getProducts(){
    this.categoryService.getProducts(this.category.id).subscribe((products)=>{this.products = products;})
   }
}