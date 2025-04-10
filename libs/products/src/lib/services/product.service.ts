import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, isDevMode } from "@angular/core";
import { map, Observable } from "rxjs";
import { Product } from "../models/api/product.model";
import { DataQeuryResponse as DataQueryResponse } from "../models/core/data-query-response.model";
import { QueryRequest } from "../models/api/query-request.model";

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly BASE_URL = `api/products`;
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public query(params?: QueryRequest | HttpParams): Observable<DataQueryResponse<Product>> {
    return this._httpClient.get(this.BASE_URL, { params: params as any }).pipe(
      map(response => response as DataQueryResponse<Product>)
    );
  }

  public queryWithStringParams(params?: string): Observable<DataQueryResponse<Product>> {
    const urlParams = params ? `${this.BASE_URL}?${params}` : this.BASE_URL;
    return this._httpClient.get(urlParams).pipe(
      map(response => response as DataQueryResponse<Product>),
      map((response) => {
        if (isDevMode()) {
          response.data = response.data.map(product => {
            product.images = product.images?.map(image => {
              return ({
                ...image,
                url: `http://localhost:1337${image.url}`
              })
            });
            return product;
          });
          return response;
        } else {
          return response;
        }
      })
    );
  }

  public getDetails(id: string, params?: QueryRequest): Observable<Product> {
    return this._httpClient.get(`${this.BASE_URL}/${id}`, { params: params as any }).pipe(
      map((response: any) => response.data as Product),
      map((product: Product) => {
        if (isDevMode()) {
          product.images = product.images?.map(image => {
            return ({
              ...image,
              url: `http://localhost:1337${image.url}`
            })
          });
          return product;
        } else {
          return product;
        }
      })
    )
  }

}
