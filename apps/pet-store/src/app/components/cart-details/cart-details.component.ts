import { Component, effect, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CartItem, Filters, Product, ProductService, QueryRequest } from 'products';
import QueryString from 'qs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartItemsContextService } from '../../services/context/cart-items-context.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderDetailsComponent } from "../order-details/order-details.component";

class CartItemFormGroup {
  public id!: FormControl<string | null>;
  public quantity!: FormControl<number | null>;
}

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    OrderDetailsComponent
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss'
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  public items: WritableSignal<CartItem[]> = signal([]);
  public mainForm: FormArray<FormGroup<CartItemFormGroup>> = new FormArray<FormGroup<CartItemFormGroup>>([]);
  public isCheckout = false;

  private _mainFormValueChangesSubscription: Subscription | null = null;

  constructor(
    private readonly _productService: ProductService,
    private readonly _cartItemsContextService: CartItemsContextService,
  ) {
    effect(() => {
      const cartItemsChanges = this._cartItemsContextService.items();
      this._handleCartItemChanges(cartItemsChanges);
    });
  }

  ngOnInit(): void {
    this._mainFormValueChangesSubscription =  this._subscribeItemQuantityChanges();
  }

  ngOnDestroy(): void {
    if (this._mainFormValueChangesSubscription) {
      this._mainFormValueChangesSubscription.unsubscribe();
    }
  }

  public removeItem(item: CartItem): void {
    this._cartItemsContextService.removeItem(item.id);
  }

  public proceedCheckout(): void {
    this.isCheckout = true;
  }

  private _handleCartItemChanges(cartItems: CartItem[]): void {
    this._enrichCartItems(cartItems);
  }

  private _subscribeItemQuantityChanges(): Subscription {
    return this.mainForm.valueChanges.subscribe((items) => {
      items.forEach((item) => {
        if (item.id && item.quantity) {
          this._cartItemsContextService.updateItem(item.id, item.quantity);
          this.items.update(items => {
            const existingItem = items.find(i => i.id === item.id);
            if (existingItem) {
              existingItem.quantity = item.quantity ?? 1;
            }
            return items;
          });
        }
      });
    });
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

      this._initializeMainform(cartItems);

      this.items.set(cartItems);
    });
  }
  private _initializeMainform(cartItems: CartItem[]): void {
    this.mainForm.clear();
    cartItems.forEach((item) => {
      const formGroup = new FormGroup<CartItemFormGroup>({
        id: new FormControl(item.id),
        quantity: new FormControl(item.quantity)
      });
      this.mainForm.push(formGroup, { emitEvent: false });
    }
    );
  }
}
