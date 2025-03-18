export class QueryRequest {
  public fields?: string | string[];
  public populate?: string | string[];
  public filter?: string | string[];
  public pagination?: string;
}
