import { Component, OnInit } from '@angular/core';
import { Category } from '../models';
import { ApiService} from '../api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories!: Category[];
  loaded!: boolean;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.loaded = false;
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.loaded = true;
    });
  }
}
