import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService, Product, ProductCardComponent } from 'products';
import { UserPermissionContextService } from '../../services/context/user-permission-context.service';

@Component({
  selector: 'app-pet-dashboard',
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
