import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { filter, map, Observable, tap } from "rxjs";
import { AuthenticationPayload, AuthenticationResponse } from "../../models/api/authentication.model";
import { LocalStorageService } from "../common/local-storage.service";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly BASE_URL = '/api/auth';

  constructor(
    private _httpClient: HttpClient,
    private _localStorage: LocalStorageService,
    private _cookieService: SsrCookieService,
    @Inject(PLATFORM_ID) private _platformId: string
  ) {
  }

  public authenticate(payload: AuthenticationPayload): Observable<AuthenticationResponse> {
    return this._httpClient.post(`${this.BASE_URL}/local`, payload).pipe(
      map((response: any) => response as AuthenticationResponse)
    );
  }

  public logout(): Observable<boolean> {
    return this._httpClient.post(`/auth/logout`, {}).pipe(
      map((response) => response as boolean),
      filter((result) => !!result),
      tap(() => {
        if (isPlatformBrowser(this._platformId) && this._localStorage.get('user')) {
          this._localStorage.remove('user');
        }
      })
    );
  }
}
