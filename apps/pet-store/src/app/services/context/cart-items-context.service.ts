import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Product } from 'products';
import { LocalStorageService } from '../common/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemsContextService {
  private _items: WritableSignal<Product[]> = signal<Product[]>([]);
  public numItems = computed(() => this._items().length);

  constructor(
    private readonly _localStorage: LocalStorageService,
  ) {
  }

  public addItem(item: Product): void {
    this._items.update((items) => {
      return [...items, item];
    });
  }

  public getNumItems(): Signal<number> {
    return this.numItems;
  }
} 