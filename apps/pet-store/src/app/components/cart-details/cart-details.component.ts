import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { COOKIE_CART_ITEMS } from '../../constants/cookie.constant';
import { CartItem, Filters, Product, ProductService, QueryRequest } from 'products';
import QueryString from 'qs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss'
})
export class CartDetailsComponent implements OnInit {
  public items: WritableSignal<CartItem[]> = signal([]);
  constructor(
    private readonly _ssrCookieService: SsrCookieService,
    private readonly _productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this._getCartItens();
  }

  private _getCartItens(): void {
    const cartItems = JSON.parse(this._ssrCookieService.get(COOKIE_CART_ITEMS) || '') as CartItem[];
    if (cartItems) {
      this._enrichCartItems(cartItems);
    }
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
