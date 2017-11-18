import { Component, Input } from '@angular/core';
import { PermissionGroup } from './permission-group';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { Role, RoleService } from 'app/contents/role/role.service';

@Component({
    moduleId: module.id,
    selector: 'app-cmall-role-permission-edit',
    styleUrls: ['permission-edit.component.css'],
    templateUrl: 'permission-edit.component.html'
})
export class PermissionEditComponent {
    @Input()
    role: Role;

    @Input()
    permissionGroups: Array<PermissionGroup> = [];

    _saving = false;

    constructor(private subject: NzModalSubject,
        private messageService: NzMessageService,
        private roleService: RoleService) {
    }

    cancel(e): void {
        this.subject.destroy('cancel');
    }

    save() {
        this._saving = true;

        const permissionCodes: Set<string> = new Set();
        this.permissionGroups.forEach(g => {
            g.permissions.forEach(p => {
                if (p.has) {
                    permissionCodes.add(p.permission.code);
                }
            });
        });

        this.roleService.coverRolePermissions(this.role.name, permissionCodes).subscribe(
            result => {
                this._saving = false;
                if (result.code !== 0) {
                    this.messageService.error('保存角色权限失败：' + result.message);
                    return;
                }
                this.subject.next('OK');
            },
            error => {
                this._saving = false;
                this.messageService.error('执行失败：' + error);
            }
        );
    }
}
