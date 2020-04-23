import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit, OnDestroy {
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
    private authService: AuthService,
    private orderService: OrderService) {

    this.idOrder = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.order$ = await this.authService.user$
        .pipe(switchMap(user => {
            return this.orderService.getOrderByIdAndUser(this.idOrder, user.uid);
          })
        );

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
