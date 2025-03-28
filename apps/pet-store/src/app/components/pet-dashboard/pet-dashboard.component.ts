import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService, Product, ProductCardComponent } from 'products';

@Component({
  selector: 'app-pet-dashboard',
  standalone: true,
  imports: [
    ProductCardComponent
],
  templateUrl: './pet-dashboard.component.html',
  styleUrl: './pet-dashboard.component.scss'
})
export class PetDashboardComponent implements OnInit {
  products: WritableSignal<Product[]> = signal([]);

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
