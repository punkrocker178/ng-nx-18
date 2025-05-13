import { Component, OnInit } from '@angular/core';
import { OrderDetailsComponent } from "../order-details/order-details.component";
import { ActivatedRoute } from '@angular/router';
import { Order, OrderService } from 'products';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [OrderDetailsComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent implements OnInit {
  public orderId: string | null = null;
  public orderData: Order | null = null;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _orderService: OrderService
  ) {
    this.orderId = this._activatedRoute.snapshot.params['orderId'];
  }

  ngOnInit(): void {
    this._getOrderDetails();
  }

  private _getOrderDetails() {
    this._orderService.getOrderDetails(this.orderId!).subscribe({
      next: (response) => {
        this.orderData = response.data;
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      }
    });
  }

}
