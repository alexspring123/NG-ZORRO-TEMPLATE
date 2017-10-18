import { Permission } from "app/base/shared/model/session";


export class PermissionWithState {
    permission: Permission;
    has: boolean;

    constructor(permission: Permission, has: boolean) {
        this.permission = permission;
        this.has = has;
    }
}

export class PermissionGroup {
    menuCode: string;
    menuName: string;
    permissions: Array<PermissionWithState> = [];

    constructor(menuCode: string, menuName: string, permissions: Array<PermissionWithState>) {
        this.menuCode = menuCode;
        this.menuName = menuName;
        this.permissions = permissions;
    }

    public appendPermission(permission: PermissionWithState) {
        if (!this.permissions)
            this.permissions = [];
        this.permissions.push(permission);
    }
}