import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular7-data-table';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  tableResources: DataTableResource<Order>;
  subscription: Subscription;
  orders: Order[] = [];
  ordersCount: number;
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) { }

  private initializeTable(orders: Order[]) {
    this.tableResources = new DataTableResource(orders);
    this.tableResources.query({ offset: 0 })
      .then(orders => this.orders = orders);
    this.tableResources.count()
      .then(count => this.ordersCount = count);
  }

  reloadOrders(params) {
    if (!this.tableResources) { return; }

    this.tableResources.query(params)
      .then(orders => this.orders = orders);
  }

  async ngOnInit() {
    this.orders$ = await this.authService.user$
        .pipe(switchMap(user => {
            return this.orderService.getOrdersByUser(user.uid);
          })
        );

    this.subscription = this.orders$.subscribe(orders => {
        this.orders = orders;
        this.initializeTable(orders);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
