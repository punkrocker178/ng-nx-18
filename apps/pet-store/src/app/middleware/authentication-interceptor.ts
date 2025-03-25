import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token');

  if (token) {
    req = setToken(req, JSON.parse(token));
  }

  return next(req);
}

const setToken = (request: HttpRequest<any>, token: string) => {
  return request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`)
  });
}