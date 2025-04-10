import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParamsQueryRequest } from 'products';
import { map, Observable, switchMap } from 'rxjs';
import { Permission, UserPermission } from '../../models/api/user-permissions.model';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService {
  private readonly BASE_URL = '/api/users-permissions';
  constructor(
    private _httpClient: HttpClient,
  ) {

  }

  readonly PERMISSION_TYPE = {
    API: 'api::',
    PLUGIN: 'plugin::',
  };

  public getUserPermissions(): Observable<UserPermission> {
    const payload = {
      populate: 'role'
    } as HttpParamsQueryRequest;
    return this._httpClient.get('/api/users/me', { params: payload as any }).pipe(
      switchMap((response: any) => {
        return this.getRoleDetails(response.role.id);
      })
    );
  }

  public getRoleDetails(roleId: string): Observable<UserPermission> {
    return this._httpClient.get(`${this.BASE_URL}/roles/${roleId}`).pipe(
      map((response: any) => {
        const role = response['role'];
        const permissions: UserPermission = new UserPermission();
        for (const [key, value] of Object.entries(role['permissions'])) {
          const entity = key.split('::')[1];

          if (key.startsWith(this.PERMISSION_TYPE.API)) {
            permissions[key] = (value as any)['controllers'][entity] as Permission;
          }
        }
        return permissions;
      })
    );
  }

}