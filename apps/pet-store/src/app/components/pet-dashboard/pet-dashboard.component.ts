import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService, Product, ProductCardComponent } from 'products';
import { MatButtonModule } from '@angular/material/button';
import { PERMISSION_ACTION, PERMISSION_API_PRODUCT } from '../../constants/permissions.constant';

@Component({
  selector: 'app-pet-dashboard',
  imports: [
    ProductCardComponent,
    MatButtonModule
  ],
  templateUrl: './pet-dashboard.component.html',
  styleUrl: './pet-dashboard.component.scss'
})
export class PetDashboardComponent implements OnInit {
  products: WritableSignal<Product[]> = signal([]);

  readonly ADD_PRODUCT_PERMISSION = `${PERMISSION_API_PRODUCT}-${PERMISSION_ACTION.create}`;

  constructor(
    private readonly _productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this._productService.query({
      populate: ['category', 'images']
    }
    ).subscribe((products) => {
      this.products.set(products.data);
    });
  }
}
