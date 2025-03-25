import { Injectable } from "@angular/core";
import { User } from "../../models/api/authentication.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserInfoContextService {
 private _userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

 public setUser(user: User): void {
    this._userSubject.next(user);
 }

 public getUser(): Observable<User> {
    return this._userSubject.asObservable();
 }

 public getUserValue(): User {
    return this._userSubject.getValue();
 }
}