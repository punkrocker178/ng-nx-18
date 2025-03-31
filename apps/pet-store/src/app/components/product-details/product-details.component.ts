import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductComponent } from 'products';

@Component({
    selector: 'app-product-details',
    imports: [ProductComponent],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  public productId!: string;

  constructor(
    private _activatedRoute: ActivatedRoute
  ) {
    this.productId = this._activatedRoute.snapshot.params['productId'];
  }


}
