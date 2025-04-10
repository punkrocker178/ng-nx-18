import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Filters, Product, ProductService, QueryRequest } from 'products';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import QueryString from 'qs';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit, OnDestroy{
  public searchControl: FormControl<string | null> = new FormControl('');
  public filteredProducts = signal<Product[]>([]);
  public subscription: Subscription | undefined;

  constructor(
    private readonly _productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.searchControl.valueChanges.subscribe((searchText) => {
      if (searchText) {
        this._searchProducts(searchText);
      } else {
        this.filteredProducts.set([]);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private _searchProducts(searchText: string): void {
    const params = {
      populate: ['images'],
      filters: {
        name: {
          $startsWith: searchText
        }
      } as Filters<Product>
    } as QueryRequest;

    const stringParams = QueryString.stringify(params, {
      encodeValuesOnly: true
    });

    this._productService.queryWithStringParams(stringParams).subscribe((response) => {
      this.filteredProducts.set(response.data);
    });
  }

}
