import { Component, input, makeStateKey, OnDestroy, OnInit, output, signal, TransferState, WritableSignal } from '@angular/core';
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
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  readonly PRODUCT_KEY = makeStateKey<Product>('product');
  productId = input<string>('');
  product: Product | null = null;
  productImageList: Image[] | undefined;
  descriptionText: string[] = [];

  selectedImage: WritableSignal<Image | null> = signal(null);

  emitProductAdded = output<Product>();

  constructor(
    private _productService: ProductService,
    private _transferState: TransferState
  ) {

  }

  ngOnInit(): void {
    this._getProductDetails();
  }

  private _getProductDetails(): void {
    if (this._transferState.hasKey(this.PRODUCT_KEY)) {
      this.product = this._transferState.get(this.PRODUCT_KEY, null);
      if (this.product) {
        this._handleProductAdditionalData(this.product)
      }
      return;
    }

    const queryRequest = {
      populate: ['category', 'images'],
    } as QueryRequest;

    this._productService.getDetails(this.productId(), queryRequest).pipe(delay(500)).subscribe((product: Product) => {
      this._transferState.set(this.PRODUCT_KEY, product);
      this.product = product;

      this._handleProductAdditionalData(product);
    });
  }

  private _handleProductAdditionalData(product: Product): void {
    this.productImageList = product?.images;
    if (product?.description && Array.isArray(product.description)) {
      this.descriptionText = this._getRichTextDescription(product.description);
    } else if (typeof this.product?.description === 'string') {
      this.descriptionText = [this.product.description];
    }
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
    if (this.product) {
      this.emitProductAdded.emit(this.product);
    }
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

  ngOnDestroy(): void {
    this._transferState.remove(this.PRODUCT_KEY);
  }
}
