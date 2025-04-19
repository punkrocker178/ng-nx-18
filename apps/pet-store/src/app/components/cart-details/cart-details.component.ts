import { Component, effect, signal, WritableSignal } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { CartItem, Filters, Product, ProductService, QueryRequest } from 'products';
import QueryString from 'qs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartItemsContextService } from '../../services/context/cart-items-context.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss'
})
export class CartDetailsComponent {
  public items: WritableSignal<CartItem[]> = signal([]);
  constructor(
    private readonly _ssrCookieService: SsrCookieService,
    private readonly _productService: ProductService,
    private readonly _cartItemsContextService: CartItemsContextService,
  ) {
    effect(() => {
      const cartItemsChanges = this._cartItemsContextService.items();
      this._handleCartItemChanges(cartItemsChanges);
    });
  }

  public removeItem(item: CartItem): void {
    this._cartItemsContextService.removeItem(item.id);
  }

  private _handleCartItemChanges(cartItems: CartItem[]): void {
    this._enrichCartItems(cartItems);
  }

  private _enrichCartItems(cartItems: CartItem[]): void {
    const queryIds = cartItems.map((item) => item.id);
    const queryRequest = {
      filters: {
        documentId: {
          $in: queryIds
        }
      } as Filters<Product>,
      populate: ['images']
    } as QueryRequest;

    this._productService.queryWithStringParams(QueryString.stringify(queryRequest)).subscribe((response) => {
      const cartItemsData = response.data.map((item) => ({
        id: item.documentId,
        name: item.name,
        price: item.price,
        thumbnail: item.images ? item.images[0]?.url : ''
      }));

      cartItems = cartItems.map((cartItem) => {
        const productData = cartItemsData.find((item) => item.id === cartItem.id);
        if (productData) {
          cartItem = {
            ...cartItem,
            ...productData
          };
        }
        return cartItem;
      });

      this.items.set(cartItems);
    });
  }
}
