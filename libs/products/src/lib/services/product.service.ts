import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Product } from "../models/product.model";
import { DataQeuryResponse as DataQueryResponse } from "../models/data-query-response.model";

@Injectable({providedIn: 'root'})
export class ProductService {
    readonly BASE_URL = `api/products`;
    constructor(
        private readonly _httpClient: HttpClient
    ) {}

    public query(params: any): Observable<DataQueryResponse<Product>> {
        return this._httpClient.get(this.BASE_URL).pipe(
            map(response => response as DataQueryResponse<Product>)
        );
    }

    public getDetails(id: string): Observable<Product> {
        return this._httpClient.get(`${this.BASE_URL}/${id}`).pipe(
            map((response: any) => response.data as Product)
        )
    }

}