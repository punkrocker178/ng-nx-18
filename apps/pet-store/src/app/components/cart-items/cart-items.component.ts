import { Component, computed, effect, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { CartItemsContextService } from '../../services/context/cart-items-context.service';

@Component({
  selector: 'app-cart-items',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    RouterModule
  ],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss'
})
export class CartItemsComponent {
  public cartItemsCount = computed(() => this._cartItemsContextService.numItems());

  constructor(
    private readonly _cartItemsContextService: CartItemsContextService
  ) {
  }

}
