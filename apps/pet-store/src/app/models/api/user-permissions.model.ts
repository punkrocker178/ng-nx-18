export class UserPermission {
[key: string]: Permission;
}

export class Permission {
  [key: string]: PermissionAction;
  public find!: PermissionAction;
  public findOne!: PermissionAction;
  public create!: PermissionAction;
  public update!: PermissionAction;
  public delete!: PermissionAction
}

export class PermissionAction {
  public enabled!: boolean;
  public policy!: string;
}