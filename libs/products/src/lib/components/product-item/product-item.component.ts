import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartItem, CartService } from '@blubits/orders';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'products-items',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = {};
  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}
  addToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1,
    };
    this.cartService.setCartItem(cartItem);
    this.messageService.add({
      severity: 'success',
      summary: "Success",
      detail: `Item added successfully`,
    });
  }
}
