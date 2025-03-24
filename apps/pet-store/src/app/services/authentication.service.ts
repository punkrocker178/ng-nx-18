import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AuthenticationPayload, AuthenticationResponse } from "../models/api/authentication.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly BASE_URL = '/api/auth';

  constructor(private _httpClient: HttpClient) {
  }

  public authenticate(payload: AuthenticationPayload): Observable<AuthenticationResponse> {
    return this._httpClient.post(`${this.BASE_URL}/local`, payload).pipe(
      map((response: any) => response as AuthenticationResponse)
    );
  }
}