import { Component, effect, input, isDevMode, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/api/product.model';
import { ProductService } from '../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { QueryRequest } from '../models/api/query-request.model';
import { delay } from 'rxjs';
import { Image } from '../models/api/image.model';
import { Description } from '../models/api/description.model';

@Component({
  selector: 'lib-product',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
})
export class ProductComponent {
  productId = input<string>('');
  product: Product | null = null;
  productImageList: Image[] | undefined;
  descriptionText: string[] = [];

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
      if (product.description) {
        this.descriptionText = this._getRichTextDescription(product.description);
      }
    });
  }

  private _getRichTextDescription(description: Description[]): string[] {
    let result: string[] = [];
    description.forEach((desc) => {
      if (desc.type === 'text') {
        result.push(desc.text);
      }
      if (desc.type === 'paragraph') {
        result = result.concat(desc.children.map((child) => child.text.replace(/\r/g, '')).join(''), '\n');
      }
    });
    return result;
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onKeydown(event: KeyboardEvent): void {
  }
}
