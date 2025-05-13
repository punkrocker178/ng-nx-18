import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderPayload } from '../../models/api/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly API_URL = '/api/orders';

  constructor(
    private readonly _httpClient: HttpClient,
  ) {}

  public createOrder(payload: OrderPayload): Observable<any> {
    return this._httpClient.post(this.API_URL, { data: payload });
  }
}
