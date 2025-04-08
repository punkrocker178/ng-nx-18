import { Injectable, signal } from '@angular/core';
import { UserPermission } from '../../models/api/user-permissions.model';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionContextService {
  private _userPermissions = signal<UserPermission | null>(null);


  get userPermissions(): UserPermission | null {
    return this._userPermissions();
  }

  public setUserPermissions(userPermissions: UserPermission | null): void {
    this._userPermissions.set(userPermissions);
  }

  public hasPermission(permission: string, action: string): boolean {
    if (!this.userPermissions) {
      return false;
    }
    const permissionObject = this.userPermissions[permission];
    return permissionObject[action]?.enabled;
  }
}