import { computed, Directive, effect, ElementRef, input } from '@angular/core';
import { UserPermissionContextService } from '../services/context/user-permission-context.service';
import { PERMISSION_ACTION_DELIMITER } from '../constants/permissions';

@Directive({
  selector: '[appFeatureGuard]',
  standalone: true
})
export class FeatureGuardDirective {
  requiredPermissions = input<string[]>();
  requiredAnyOfPermissions = input<string[]>();

  constructor(
    private _elementRef: ElementRef,
    private userPermissionContextService: UserPermissionContextService
  ) {
    effect(() => {
      if (this.requiredPermissions() !== undefined) {
        this._checkPermissions(this.requiredPermissions() as string[]);
      } else if (this.requiredAnyOfPermissions() !== undefined) {
        this._checkAnyOfPermissions(this.requiredAnyOfPermissions() as string[]);
      }
    });
  }

  private _checkPermissions(permissions: string[]) {
    const hasAllPermissions = permissions.every(permission => {
      const [permissionName, action] = permission.split(PERMISSION_ACTION_DELIMITER);
      return this.userPermissionContextService.hasPermission(permissionName, action);
    });
    if (!hasAllPermissions) {
      this._hideElement();
    }
  }

  private _checkAnyOfPermissions(permissions: string[]) {
    const hasAnyPermission = permissions.some(permission => {
      const [permissionName, action] = permission.split(PERMISSION_ACTION_DELIMITER);
      return this.userPermissionContextService.hasPermission(permissionName, action);
    });
    if (!hasAnyPermission) {
      this._hideElement();
    }
  }

  private _hideElement() {
    this._elementRef.nativeElement.style.display = 'none';
  }

}