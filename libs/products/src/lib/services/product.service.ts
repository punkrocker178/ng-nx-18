import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

  public query(params: QueryRequest): Observable<DataQueryResponse<Product>> {
    return this._httpClient.get(this.BASE_URL, { params: { ...params } }).pipe(
      map(response => response as DataQueryResponse<Product>)
    );
  }

  public getDetails(id: string, params?: QueryRequest): Observable<Product> {
    return this._httpClient.get(`${this.BASE_URL}/${id}`, { params: { ...params } }).pipe(
      map((response: any) => response.data as Product)
    )
  }

}