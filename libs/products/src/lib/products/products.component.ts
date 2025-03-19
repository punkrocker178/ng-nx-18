import { Component, effect, input, isDevMode, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/api/product.model';
import { ProductService } from '../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { QueryRequest } from '../models/api/query-request.model';
import { delay } from 'rxjs';
import { Image } from '../models/api/image.model';

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
  productImageList: Image[] | undefined;
  
  selectedImage: WritableSignal<Image | null> = signal(null);

  constructor(
    private _productService: ProductService
  ) {
    effect(() => {
      this._getProductDetails();
    });

  }

  private _getProductDetails(): void {
    const queryRequest = {
      populate: ['category', 'images'],
    } as QueryRequest;

    this._productService.getDetails(this.productId(), queryRequest).pipe(delay(500)).subscribe((product: Product) => {
      this.product = product;
      this.productImageList = product.images;
    });
  }

  public addToCart(): void {
    console.log('Adding product to cart', this.product);
  }

  public goBack(): void {
    console.log('Navigating back');
  }

  public selectImage(index: number): void {
    if (this.productImageList) {
      this.selectedImage.set(this.productImageList[index]);
    }
  }

  public onKeydown(event: KeyboardEvent): void {
    console.log(event);
  }
}
