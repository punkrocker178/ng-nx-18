import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Product } from '../models/api/product.model';

@Component({
  selector: 'lib-product-card',
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  public product = input.required<Product>();
}
