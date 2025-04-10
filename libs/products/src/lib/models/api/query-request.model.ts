export class QueryRequest {
  public fields?: string | string[];
  public populate?: string | string[];
  public pagination?: Pagination;
  public sort?: string | string[];
  public filters?: Filters<string>;
}

export type HttpParamsQueryRequest = Omit<QueryRequest, 'filters' | 'pagination'>;

type FilterOperator =
  | '$eq'
  | '$eqi'
  | '$ne'
  | '$nei'
  | '$lt'
  | '$lte'
  | '$gt'
  | '$gte'
  | '$in'
  | '$notIn'
  | '$contains'
  | '$notContains'
  | '$containsi'
  | '$notContainsi'
  | '$null'
  | '$notNull'
  | '$between'
  | '$startsWith'
  | '$startsWithi'
  | '$endsWith'
  | '$endsWithi'
  | '$or'
  | '$and'
  | '$not';

export type Pagination = {
  page?: number;
  pageSize?: number;
  withCount?: boolean;
}

export type Filters<T> = {
  [key in keyof T]?: {
    [key in FilterOperator]?: string | string[] | number | number[] | boolean | boolean[] | null;
  }
};