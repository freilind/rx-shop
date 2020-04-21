import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { Order } from 'shared/models/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,  private  shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: Order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders', ref => ref.orderByChild('datePlaced')).snapshotChanges()
    .pipe(
      map(changes =>
          changes.map(c => {
              const data = c.payload.val();
              const key = c.payload.key;
              return { key, ...data };
          })
      )
  );
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges()
    .pipe(
      map(changes =>
          changes.map(c => {
              const data = c.payload.val();
              const key = c.payload.key;
              return { key, ...data };
          })
      )
    );
  }
}
