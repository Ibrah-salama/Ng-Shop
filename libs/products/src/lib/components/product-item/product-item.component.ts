import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@blubits/products';

@Component({
  selector: 'products-featured-products',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
@Input() product:Product = {}
  constructor() { }

  ngOnInit(): void {
  }

}
