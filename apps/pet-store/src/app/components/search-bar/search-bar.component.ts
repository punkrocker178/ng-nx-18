import { Component } from '@angular/core';
import { ProductService } from 'products';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  constructor(
    private readonly _productService: ProductService,
  ) {
  }


}
