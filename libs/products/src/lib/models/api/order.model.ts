import { BaseEntity } from '../core/base-entity.model';
import { CartItem } from './cart-item.model';
import { Product } from './product.model';

export class OrderPayload {
  public orderId!: string;
  public contactInfo!: {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
  };
  public streetAddress?: string;
  public city?: string;
  public postCode?: string;
  public country?: string;
  public paymentMethod?: string;
  public termsAccepted?: boolean;
  public orderNotes?: string;
  public totalPrice!: number;
  public orderDetails?: string;
  public products!: {
    connect: string[];
  }
}

export class Order extends BaseEntity {
  id!: string;
  documentId!: string;
  orderStatus!: string;
  orderId!: string
  totalPrice!: number;
  orderDetails!: CartItem[];
  paymentMethod!: string;
  orderNotes!: string;
  products?: Product[];
  contactInfo?: {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
  }
}
