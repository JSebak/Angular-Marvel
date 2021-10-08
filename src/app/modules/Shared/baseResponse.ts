
export class BaseResultModel<T> {
  attributionHTML?: string;
  attributionText?: string;
  code?: number;
  copyright?: string;
  data?: result<T>;
  etag?: string;
  status?: string;
}

export class result<T>{
  count?: number;
  limit?: number;
  offset?: number;
  results?: T;
  total?: number;
}
