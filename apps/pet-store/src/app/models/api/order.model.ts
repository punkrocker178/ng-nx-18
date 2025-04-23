export class OrderPayload {
  public contactName?: string;
  public contactEmail!: string;
  public contactPhone!: string;
  public streetAddress?: string;
  public city?: string;
  public postCode?: string;
  public country?: string;
  public paymentMethod?: string;
  public termsAccepted?: boolean;
  public orderNotes?: string | null;
  public products!: {
    connect: string[];
  }
}
