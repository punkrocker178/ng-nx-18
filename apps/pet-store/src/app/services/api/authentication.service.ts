import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AuthenticationPayload, AuthenticationResponse } from "../../models/api/authentication.model";
import { LocalStorageService } from "../common/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly BASE_URL = '/api/auth';

  constructor(
    private _httpClient: HttpClient,
    private _localStorage: LocalStorageService
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
        this._localStorage.remove('token');
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }
}