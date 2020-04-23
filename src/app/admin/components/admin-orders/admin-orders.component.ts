import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular7-data-table';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  tableResources: DataTableResource<Order>;
  subscription: Subscription;
  orders: Order[] = [];
  ordersCount: number;
  orders$;

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }

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
    this.orders$ = await this.orderService.getOrders();

    this.subscription = this.orders$.subscribe(orders => {
        this.orders = orders;
        this.initializeTable(orders);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
