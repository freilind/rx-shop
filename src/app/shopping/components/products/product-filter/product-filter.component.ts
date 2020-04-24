import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'shared/models/category';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category;
  categories: Category[] = [];

  constructor(categoryService: CategoryService) {
    categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  ngOnInit() {
  }

}
