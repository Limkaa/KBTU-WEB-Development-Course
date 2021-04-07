import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product, Category} from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'http://127.0.0.1:8000/api';

  constructor(private client: HttpClient) {
    client.head("Access-Control-Allow-Origin");
  }

  getCategories(): Observable<Category[]> {
    console.log(this.client.get<Category[]>(`${this.BASE_URL}/categories/`));
    return this.client.get<Category[]>(`${this.BASE_URL}/categories`);
  }

  getCategory(id: number): Observable<Category> {
    return this.client.get<Category>(`${this.BASE_URL}/categories/${id}`);
  }

  getProducts(): Observable<Product[]> {
    return this.client.get<Product[]>(`${this.BASE_URL}/products/`);
  }

  getProduct(id: number): Observable<Product> {
    return this.client.get<Product>(`${this.BASE_URL}/products/${id}/`);
  }
  
}

