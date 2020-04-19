import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Category } from '../../models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: Category[] = [];
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
      categoryService.getAll().subscribe(categories => this.categories = categories);
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.productService.get(this.id).pipe(take(1)).subscribe(
          p => this.product = p.payload.val()
        );
      }
   }

   save(product) {
     if (this.id) {
       this.productService.update(this.id, product);
     } else {
       this.productService.create(product);
     }
     this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want delete this product?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit() {
  }

}
