import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '@blubits/products';

@Component({
  selector: 'orders-summery',
  templateUrl: './order-summery.component.html',
  styles: [
  ]
})
export class OrderSummeryComponent implements OnInit,OnDestroy {

  endSubs$: Subject<boolean> = new Subject();
  totalPrice=0;
  isCheckout = false;
  constructor(
    private router: Router,
    private cartService: CartService,
    private productsService: ProductsService
  ) {
    this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false);
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart?.items?.map((item) => {
          this.productsService
            .getProduct(item.productId!)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.data.price! * item.quantity!;
            });
        });
      }
    });
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }

}
