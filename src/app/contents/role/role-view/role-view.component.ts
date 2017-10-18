import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { NzMessageService, NzModalService, NzModalSubject } from "ng-zorro-antd";
import { Permission } from "app/base/shared/model/session";
import { PermissionGroup, PermissionWithState } from "app/contents/role/role-view/permission-group";
import { PermissionEditComponent } from "app/contents/role/role-view/permission-edit.component";
import { SessionService } from "app/base/shared/session.service";
import { Role, RoleUser, RoleService, AllPermissions } from "app/contents/role/role.service";

@Component({
    moduleId: module.id,
    selector: 'cmall-role-view',
    templateUrl: 'role-view.component.html',
    styleUrls: ['role-view.component.css']
})
export class RoleViewComponent implements OnInit {
    role: Role = new Role();
    _loading: boolean = false;
    _loading_users: boolean = false;
    _loading_permissions: boolean = false;
    _deleting: boolean = false;

    users: Array<RoleUser> = [];
    permissionGroups: Array<PermissionGroup> = [];
    sessionPermissions: Array<Permission> = []; //当前登录员工具有的权限

    constructor(private router: Router,
        private route: ActivatedRoute,
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private roleService: RoleService,
        private sessionService: SessionService) { }

    ngOnInit(): void {
        this.sessionPermissions = this.sessionService.getSession().permissions;

        this.route.params.forEach((params: Params) => {
            let name = params["name"];
            this.loadRole(name);
            this.loadRolePermissions(name);
            this.loadUsers(name);
        });
    }

    private loadRole(roleName: string) {
        this._loading = true;
        this.roleService.getRole(roleName).subscribe(
            result => {
                this._loading = false;
                if (result.code != 0) {
                    this.messageService.error('加载角色失败：' + result.message);
                    return;
                }
                this.role = result.data;
                if (!this.role) {
                    this.modalService.warning({
                        title: '加载角色失败',
                        content: '不存在角色' + name
                    });
                    this.router.navigateByUrl("/frame/role");
                }
            },
            error => {
                this._loading = false;
                this.messageService.error('执行失败：' + error);
            });
    }

    private loadUsers(roleName: string) {
        this._loading_users = true;
        this.roleService.getRoleUsers(roleName).subscribe(
            result => {
                this._loading_users = false;
                if (result.code != 0) {
                    this.messageService.error('加载用户列表失败：' + result.message);
                    return;
                }
                this.users = result.data;
            },
            error => {
                this._loading_users = false;
                this.messageService.error('执行失败：' + error);
            });
    }

    private loadRolePermissions(roleName: string) {
        this._loading_permissions = true;
        this.roleService.getRolePermissions(roleName).subscribe(
            result => {
                this._loading_permissions = false;
                if (result.code != 0) {
                    this.messageService.error('加载角色权限列表失败：' + result.message);
                    return;
                }
                this.permissionGroups = [];
                let permissionsList: Array<Permission> = result.data;
                this.sessionPermissions.forEach(p => {
                    const webPer = AllPermissions.find(wp => wp.code == p.code);
                    if (webPer) {
                        let group: PermissionGroup = this.permissionGroups.find(g => g.menuCode == webPer.menuCode);
                        if (!group) {
                            group = new PermissionGroup(webPer.menuCode, webPer.menuName, []);
                            this.permissionGroups.push(group);
                        }
                        let per: Permission = permissionsList.find(pp => pp.code == p.code);
                        group.appendPermission(new PermissionWithState(p, per != null));
                    }
                }
                );
            },
            error => {
                this._loading_permissions = false;
                this.messageService.error('执行失败：' + error);
            });
    }

    showPermissionEditModal() {
        // 复制一份，防止弹出框修改时详情页跟随联动
        let permGroups: Array<PermissionGroup> = [];
        this.permissionGroups.forEach(g => {
            let group = new PermissionGroup(g.menuCode, g.menuName, []);
            if (g.permissions) {
                g.permissions.forEach(p => {
                    group.appendPermission(new PermissionWithState(p.permission, p.has));
                });
            }
            permGroups.push(group);
        });

        const subscription = this.modalService.open({
            title: '修改权限',
            content: PermissionEditComponent,
            footer: false,
            componentParams: {
                role: this.role,
                permissionGroups: permGroups
            }
        });

        subscription.subscribe(result => {
            if (result == 'cancel') {
                subscription.destroy();
            } else if (result == 'OK') {
                subscription.destroy();
                this.loadRolePermissions(this.role.name);
            }
        });
    }


    delete() {
        this._deleting = true;
        this.roleService.delete(this.role.name).subscribe(
            result => {
                this._deleting = false;
                if (result.code != 0) {
                    this.messageService.error('删除角色失败：' + result.message);
                    return;
                }
                this.messageService.success('删除成功');
                this.router.navigate(['/frame/basic/role']);
            },
            error => {
                this._deleting = false;
                this.messageService.error('执行失败：' + error);
            });
    }
}