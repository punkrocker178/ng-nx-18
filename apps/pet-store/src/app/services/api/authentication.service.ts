import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AuthenticationPayload, AuthenticationResponse } from "../../models/api/authentication.model";
import { LocalStorageService } from "../common/local-storage.service";
import { isClientSide } from "../../utils/utils";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly BASE_URL = '/api/auth';

  constructor(
    private _httpClient: HttpClient,
    private _localStorage: LocalStorageService,
    private _cookieService: CookieService
  ) {
  }

  public authenticate(payload: AuthenticationPayload): Observable<AuthenticationResponse> {
    return this._httpClient.post(`${this.BASE_URL}/local`, payload).pipe(
      map((response: any) => response as AuthenticationResponse)
    );
  }

  public logout(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (this._localStorage.get('token')) {
        if (isClientSide()) {
          this._localStorage.remove('token');
          this._localStorage.remove('user');
        } else {
          this._cookieService.delete('token');
          this._cookieService.delete('user');
        }
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }
}
