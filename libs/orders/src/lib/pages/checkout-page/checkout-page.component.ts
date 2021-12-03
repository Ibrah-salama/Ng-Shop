import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@blubits/users';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { OrderService } from './../../services/order.service';
import { ORDER_STATUS } from '../../order.constant'
@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrderService
  ) {}
  checkoutFormGroup: FormGroup=this.formBuilder.group({
    name: [''],
    email: [''],
    phone: [''],
    city: [''],
    country: [''],
    zip: [''],
    apartment: [''],
    street: ['']
  });

  isSubmitted = false;
  orderItems: any = [];
  userId = '609d65943373711346c5e950';
  countries:any = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart?.items?.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
    console.log(this.orderItems);
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.addOrder(order).subscribe(
      () => {
        //redirect to thank you page // payment
        console.log('here ');
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      },
      (err) => {
        //display some message to user
        this.router.navigate(['/order-failure']);

      }
    );
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
