import { computed, Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartItem, Product } from 'products';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { COOKIE_CART_ITEMS, COOKIE_CART_ITEMS_EXPIRES } from '../../constants/cookie.constant';

@Injectable({
  providedIn: 'root'
})
export class CartItemsContextService {
  private _items: WritableSignal<CartItem[]> = signal<CartItem[]>([]);
  public numItems = computed(() => this._items().reduce((acc, item) => acc + item.quantity, 0));
  public items = computed(() => this._items());

  constructor(
    @Inject(PLATFORM_ID) private readonly _platformId: string,
    private readonly _ssrCookieService: SsrCookieService
  ) {
    const cartItems = this._ssrCookieService.get(COOKIE_CART_ITEMS);
    if (cartItems) {
      this._items.set(JSON.parse(cartItems));
    }
  }


  public addItem(item: Product): void {
    this._items.update(items => {
      const existingItem = items.find(i => i.id === item.documentId);
      if (existingItem) {
        existingItem.quantity++;
        items = [...items];
      } else {
        const newItem = {
          id: item.documentId,
          quantity: 1,
        }
        // Explicitly set new reference for items variable to force _items signal to trigger change
        items = [...items, newItem];
      }
      return items;
    });

    // Store items in cookie, expires in 365 days
    this._ssrCookieService.set(COOKIE_CART_ITEMS, JSON.stringify(this._items()), COOKIE_CART_ITEMS_EXPIRES, '/');
  }

  public updateItem(itemId: string, quantity: number): void {
    this._items.update(items => {
      const existingItem = items.find(i => i.id === itemId);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      // Nested data update will not trigger signal change
      return items;
    });
    this._ssrCookieService.set(COOKIE_CART_ITEMS, JSON.stringify(this._items()), COOKIE_CART_ITEMS_EXPIRES, '/');
  }

  public removeItem(itemId: string): void {
    this._items.update(items => {
      const existingItemIndex = items.findIndex(i => i.id === itemId);
      if (existingItemIndex > -1) {
        items.splice(existingItemIndex, 1);
      }
      items = [...items];
      return items;
    });

    // Store items in cookie, expires in 365 days
    this._ssrCookieService.set(COOKIE_CART_ITEMS, JSON.stringify(this._items()), COOKIE_CART_ITEMS_EXPIRES, '/');
  }
}
