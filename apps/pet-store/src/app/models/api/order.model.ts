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
