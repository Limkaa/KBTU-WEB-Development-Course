import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Category} from '../models';
import {ApiService} from '../api.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  category!: Category;
  products!: Product[];
  loaded!: boolean;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getCategory();
    this.getProducts();
  }

  getCategory() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.loaded = false;
      this.apiService.getCategory(id).subscribe((category) => {
        this.category = category;
      });
    });
  }

  getProducts() {
    this.route.paramMap.subscribe((params) => {
      this.loaded = false;
      this.apiService.getProducts().subscribe((products) => {
        this.products = products;
        this.loaded = true;
      });
    });
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/