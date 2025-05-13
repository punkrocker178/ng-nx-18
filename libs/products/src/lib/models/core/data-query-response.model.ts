export class DataQeuryResponse<T> {
  public data!: T[];
  public meta!: Meta
}

export class Meta {
  pagination!: Pagination
}

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}