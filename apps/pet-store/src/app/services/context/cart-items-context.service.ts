import { computed, Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartItem, Product } from 'products';
import { LocalStorageService } from '../common/local-storage.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root'
})
export class CartItemsContextService {
  private _items: WritableSignal<CartItem[]> = signal<CartItem[]>([]);
  public numItems = computed(() => this._items().reduce((acc, item) => acc + item.quantity, 0));

  constructor(
    @Inject(PLATFORM_ID) private readonly _platformId: string,
    private readonly _localStorage: LocalStorageService,
    private readonly _ssrCookieService: SsrCookieService
  ) {
    const cartItems = this._ssrCookieService.get('cartItems');
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
        items = [...items, newItem];
      }
      return items;
    });

    // Store items in cookie, expires in 365 days
    this._ssrCookieService.set('cartItems', JSON.stringify(this._items()), 365, '/');
  }
} 