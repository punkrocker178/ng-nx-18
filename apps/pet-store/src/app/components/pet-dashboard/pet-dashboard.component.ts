import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from 'products';

@Component({
  selector: 'app-pet-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule
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
      console.log(this.products())
    });
  }
}
