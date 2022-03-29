import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  product:Product;
  category: Category;
  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProduct();
  }


  getProduct(){
    this.route.paramMap.subscribe((params)=>{
      const id = +params.get('id');
      this.categoryService.getProduct(id).subscribe((data) =>{
        this.product = data;
      });
    })
  }
}
