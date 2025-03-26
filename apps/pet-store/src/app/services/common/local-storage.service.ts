import { Injectable } from '@angular/core';
import { isClientSide } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _localStorage: Storage | null = null;

  constructor() {
    if (isClientSide()) {
      this._localStorage = window.localStorage;
    }
  }

  set(key: string, value: any) {
    if (this._localStorage) {
      this._localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;

  }

  get(key: string) {
    if (this._localStorage) {
      const value = this._localStorage.getItem(key);
      return value !== null && value !== undefined ? JSON.parse(value) : null;
    }
    return false;
  }

  remove(key: string) {
    if (this._localStorage) {
      this._localStorage.removeItem(key);
      return true;
    }
    return false;
  }

}
