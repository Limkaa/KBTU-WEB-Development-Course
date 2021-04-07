import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Category} from '../models';
import {ApiService} from '../api.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  product!: Product;
  loaded!: boolean;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.loaded = false;
      this.apiService.getProduct(id).subscribe((product) => {
        this.product = product;
        this.loaded = true;
      });
    });
  }


  share(link: String, text: String) {
    window.open('https://telegram.me/share/url?url='+link, '_blank')
  }

  // likeItem(category_id, item_id) {
  //   products[category_id].items[item_id].likes+=1
  // }

  // removeItem(category_id, item_id) {
  //   products[category_id].items.splice(item_id, 1)
  //   for (var i=item_id; i<products[category_id].items.length; i++) {
  //     products[category_id].items[i].id = i
  //   }
  // }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/