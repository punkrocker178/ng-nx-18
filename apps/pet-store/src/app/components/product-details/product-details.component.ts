import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductComponent } from 'products';
import { CartItemsContextService } from '../../services/context/cart-items-context.service';

@Component({
    selector: 'app-product-details',
    imports: [ProductComponent],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  public productId!: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cartItemsContextService: CartItemsContextService
  ) {
    this.productId = this._activatedRoute.snapshot.params['productId'];
  }

  public addToCart(product: Product): void {
    // This method can be used to handle the event when a product is added to the cart
    this._cartItemsContextService.addItem(product);
  }
}
