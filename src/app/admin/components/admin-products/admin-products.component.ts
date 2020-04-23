import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular7-data-table';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;
  tableResources: DataTableResource<Product>;
  items: Product[] = [];
  itemsCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
          this.products = products;
          this.initializeTable(products);
      });
  }

  private initializeTable(products: Product[]) {
    this.tableResources = new DataTableResource(products);
    this.tableResources.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResources.count()
      .then(count => this.itemsCount = count);
  }

  reloadItems(params) {
    if (!this.tableResources) { return; }

    this.tableResources.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    const filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }


}
