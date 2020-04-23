import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  subscription: Subscription;
  order: any = {};
  quantity = 0;
  orderTotal = 0;
  order$;
  idOrder;
  notFound = false;
  show = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) {

    this.idOrder = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.order$ = await this.orderService.getOrderById(this.idOrder);

    this.subscription = this.order$.subscribe(o => {
      if (!o) {
        this.notFound = true;
        return;
      }
      this.show = true;
      this.order = o;
      o.items.forEach(x => {
        this.orderTotal += x.totalPrice;
        this.quantity += x.quantity;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
