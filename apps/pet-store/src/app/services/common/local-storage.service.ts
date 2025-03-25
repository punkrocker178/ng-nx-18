import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _localStorage: Storage;

  constructor() {
    this._localStorage = window.localStorage;
  }

  set(key: string, value: any) {
    if (this.isSupportLocalStorage()) {
      this._localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;

  }

  get(key: string) {
    if (this.isSupportLocalStorage()) {
      const value = this._localStorage.getItem(key);
      return value !== null && value !== undefined ? JSON.parse(value) : null;
    }
    return false;
  }

  remove(key: string) {
    if (this.isSupportLocalStorage()) {
      this._localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  isSupportLocalStorage() {
    return !!this._localStorage;
  }
}