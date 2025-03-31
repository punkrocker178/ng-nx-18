import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, EMPTY, Observable } from "rxjs";

const acessTokenAPIs = ['/api/auth/local'];

export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const skipHeader = req.headers.get('skip') === 'true';

  if (skipHeader || !isValidRequestToIntercept(req.url)) {
    return next(req);
  }

  const routerService = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return EMPTY;
      }
      throw error;
    })
  );
}

const isValidRequestToIntercept = (url: string): boolean => {
  const skipRequest = acessTokenAPIs.find((api) => url.includes(api));
  if (skipRequest) {
    return false;
  }

  return true;
}
