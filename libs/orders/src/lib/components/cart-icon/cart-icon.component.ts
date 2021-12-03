import { Component, OnInit } from '@angular/core';
import { CartService } from '@blubits/orders';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {
  cartCount:number | undefined = 0; 
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart=>{
      console.log(cart);
      this.cartCount = cart?.items?.length || 0
    })
    // this.cartCount = this.cartService.getCart().items?.length
  }

}
