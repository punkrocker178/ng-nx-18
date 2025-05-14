import { CommonModule } from '@angular/common';
import { Component, effect, input, InputSignal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CartItem, Order, OrderPayload, OrderService } from 'products';
import { MatListModule } from '@angular/material/list';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { CartItemsContextService } from '../../services/context/cart-items-context.service';

type OrderDetailsFormViewModel = {
  contactName: FormControl<string>;
  contactEmail: FormControl<string>;
  contactPhone: FormControl<string>;
  streetAddress: FormControl<string | null>;
  city: FormControl<string | null>;
  postCode: FormControl<string | null>;
  country: FormControl<string | null>;
  paymentMethod: FormControl<string | null>;
  termsAccepted: FormControl<boolean | null>;
  orderNotes: FormControl<string | null>;
};

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatListModule,
    ReactiveFormsModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  public checkoutItems: InputSignal<CartItem[]> = input.required<CartItem[]>();
  public orderDetails: InputSignal<Order | null> = input<Order | null>(null);

  public totalPrice = 0;
  mainForm: FormGroup<OrderDetailsFormViewModel> | undefined;

  constructor(
    private readonly _router: Router,
    private readonly _cartItemsContextService: CartItemsContextService,
    private readonly _orderService: OrderService,
  ) {
    effect(() => {
      if (this.checkoutItems()) {
        this._handleCartItemChanges(this.checkoutItems());
      }
    });
  }

  ngOnInit(): void {
    this._initializeMainForm();
  }

  public onSubmit(): void {
    const payload = this._prepareOrderPayload();
    if (!payload) return;
    this._orderService.createOrder(payload).subscribe((res) => {
      this._cartItemsContextService.removeAllItems();
      this._router.navigateByUrl(`orders/${res.data.documentId}`);
    });
  }

  private _initializeMainForm(): void {
    this.mainForm = new FormGroup<OrderDetailsFormViewModel>({
      contactName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      contactEmail: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      contactPhone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      streetAddress: new FormControl(null),
      city: new FormControl(null),
      postCode: new FormControl(null),
      country: new FormControl(null),
      paymentMethod: new FormControl<string>(''),
      termsAccepted: new FormControl<boolean>(false),
      orderNotes: new FormControl<string>('')
    });
  }

  private _handleCartItemChanges(cartItems: CartItem[]): void {
    this.totalPrice = cartItems.reduce(
      (acc, item) => {
        const itemPrice = item.price ?? 0;
        const itemQuantity = item.quantity ?? 1;
        return acc + (itemPrice * itemQuantity);
      },
      0
    );
  }

  private _prepareOrderPayload(): OrderPayload | null {
    if (!this.mainForm) return null;
    const formValue = this.mainForm.value;
    const payload = {
      contactInfo: {
        contactName: formValue.contactName!,
        contactEmail: formValue.contactEmail!,
        contactPhone: formValue.contactPhone!
      },
      streetAddress: formValue.streetAddress ?? undefined,
      city: formValue.city ?? undefined,
      postCode: formValue.postCode ?? undefined,
      country: formValue.country ?? undefined,
      paymentMethod: formValue.paymentMethod ?? 'COD',
      orderNotes: formValue.orderNotes ?? undefined,
      orderId: uuidv4(),
      totalPrice: this.totalPrice,
    } as OrderPayload;

    payload.orderDetails = JSON.stringify(this.checkoutItems().map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      thumbnail: item.thumbnail
    })));

    payload.products = {
      connect: this.checkoutItems().map(item => item.id)
    }

    return payload;
  }
}
