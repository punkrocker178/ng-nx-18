import { Injectable } from "@angular/core";
import { User } from "../../models/api/authentication.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserInfoContextService {
 private _userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

 public setUser(user: User | null): void {
    this._userSubject.next(user);
 }

 public getUser(): Observable<User | null> {
    return this._userSubject.asObservable();
 }

 public getUserValue(): User | null {
    return this._userSubject.getValue();
 }
}