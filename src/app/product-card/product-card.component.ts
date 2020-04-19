import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart= {items:[]};

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product: Product){
    this.shoppingCartService.removeFromCart(product);
  }

  getQuantity() {
    if (!this.shoppingCart)  { return 0; }

    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

}
