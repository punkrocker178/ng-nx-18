import { CommonModule } from '@angular/common';
import { Component, effect, input, InputSignal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CartItem } from 'products';
import { MatListModule } from '@angular/material/list';

class OrderDetailsFormViewModel {
  public contactName!: FormControl<string | null>;
  public contactEmail!: FormControl<string | null>;
  public contactPhone!: FormControl<string | null>;
  public streetAddress!: FormControl<string | null>;
  public city!: FormControl<string | null>;
  public postCode!: FormControl<string | null>;
  public country!: FormControl<string | null>;
  public paymentMethod!: FormControl<string | null>;
  public termsAccepted!: FormControl<boolean | null>;
  public orderNotes!: FormControl<string | null>;
}

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
  public totalPrice = 0;
  mainForm: FormGroup<OrderDetailsFormViewModel> | undefined;

  constructor() {
    effect(() => {
      if (this.checkoutItems()) {
        this._handleCartItemChanges(this.checkoutItems());
      }
    });
  }

  ngOnInit(): void {
    this._initializeMainForm();
  }

  private _initializeMainForm(): void {
    this.mainForm = new FormGroup<OrderDetailsFormViewModel>({
      contactName: new FormControl<string | null>(null),
      contactEmail: new FormControl<string | null>(null),
      contactPhone: new FormControl<string | null>(null),
      streetAddress: new FormControl<string | null>(null),
      city: new FormControl<string | null>(null),
      postCode: new FormControl<string | null>(null),
      country: new FormControl<string | null>(null),
      paymentMethod: new FormControl<string | null>(null),
      termsAccepted: new FormControl<boolean | null>(null),
      orderNotes: new FormControl<string | null>(null)
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
}
