import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map, take } from 'rxjs/operators';
import { Order } from 'shared/models/order';

import { ShoppingCartService } from './shopping-cart.service';

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

  getOrderById(orderId: string) {
    return this.db.object('/orders/' + orderId).snapshotChanges()
    .pipe(
      map((order: any ) => {
        if (order.payload.exists()) {
          const data = order.payload.val();
          const key = order.payload.key;
          return { key, ...data };
        } else {
          return null;
        }
      })
    );
  }

  getOrderByIdAndUser(orderId: string, userId: string) {
    return this.db.object('/orders/' + orderId).snapshotChanges()
    .pipe(
      map((order: any ) => {
        if (order.payload.exists() && userId === order.payload.val().userId) {
          const data = order.payload.val();
          const key = order.payload.key;
          return { key, ...data };
        } else {
          return null;
        }
      })
    );
  }

}
