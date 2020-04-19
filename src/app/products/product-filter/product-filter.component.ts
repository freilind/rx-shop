import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories: Category[] = [];
  @Input('category') category;

  constructor(categoryService: CategoryService) {
    categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  ngOnInit() {
  }

}
