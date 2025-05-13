import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order, OrderPayload } from '../models/api/order.model';
import { SingleQueryResponse } from '../models/core/data-query-response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly API_URL = '/api/orders';

  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  public createOrder(payload: OrderPayload): Observable<any> {
    return this._httpClient.post(this.API_URL, { data: payload });
  }

  public getOrderDetails(orderId: string): Observable<SingleQueryResponse<Order>> {
    return this._httpClient.get(`${this.API_URL}/${orderId}`, { params: { populate: 'contactInfo' } }).pipe(
      map((response: any) => response as SingleQueryResponse<Order>)
    )
  }
}
