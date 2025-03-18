import { Component, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/api/product.model';
import { ProductService } from '../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { QueryRequest } from '../models/api/query-request.model';

@Component({
  selector: 'lib-product',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductComponent {
  productId = input<string>('');
  product: Product | null = null;


  constructor(
    private _productService: ProductService
  ) {
    effect(() => {
      this._getProductDetails();
    });
  }

  private _getProductDetails(): void {
    const queryRequest = {
      populate: 'category',
    } as QueryRequest;

    this._productService.getDetails(this.productId(), queryRequest).subscribe((product: Product) => {
      this.product = product;
    });
  }

  public addToCart(): void {
    console.log('Adding product to cart', this.product);
  }

  public goBack(): void {
    console.log('Navigating back');
  }
}
