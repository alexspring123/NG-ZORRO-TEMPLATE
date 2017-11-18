import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { UserResetPasswordComponent } from 'app/contents/user/user-view/user-reset-password.component';
import { UserRoleEditComponent } from 'app/contents/user/user-view/user-role-edit.component';
import { User, UserService, UserRole } from 'app/contents/user/user.service';

@Component({
    moduleId: module.id,
    selector: 'app-cmall-user-view',
    styleUrls: ['user-view.component.css'],
    templateUrl: 'user-view.component.html'
})
export class UserViewComponent implements OnInit {
    user: User = new User();
    roles: Array<UserRole> = [];

    _loading = false;
    _deleting = false;
    _roleRemoving = false;
    _roleLoading = false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private modalService: NzModalService,
        private messageService: NzMessageService,
        private userService: UserService) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            const code = params['code'];
            this.load(code);
            this.loadRoles(code);
        });
    }

    private load(code: string) {
        this._loading = true;
        this.userService.getUser(code).subscribe(
            result => {
                this._loading = false;
                if (result.code !== 0) {
                    this.messageService.error('加载用户失败：' + result.message);
                    return;
                }
                this.user = result.data;
                if (!this.user) {
                    this.messageService.warning('用户' + this.user.code + '不存在');
                    this.router.navigate(['/frame/basic/user']);
                }
            },
            error => {
                this._loading = false;
                this.messageService.error('执行失败：' + error);
            }
        );
    }

    private loadRoles(code: string) {
        this._roleLoading = true;
        this.userService.getUserRoles(code).subscribe(
            result => {
                this._roleLoading = false;
                if (result.code !== 0) {
                    this.messageService.error('加载用户角色列表失败：' + result.message);
                }
                this.roles = result.data;
            },
            error => {
                this._roleLoading = false;
                this.messageService.error('执行失败：' + error);
            }
        );
    }

    delete(user: User): void {
        this._deleting = true;
        this.userService.delete(user.code).subscribe(
            result => {
                this._deleting = false;
                if (result.code !== 0) {
                    this.messageService.error('删除用户失败：' + result.message);
                    return;
                }
                this.messageService.success('删除用户成功');
                this.router.navigate(['/frame/basic/user']);
            },
            error => {
                this._deleting = false;
                this.messageService.error('执行失败：' + error);
            }
        );
    }

    removeRole(role: UserRole): void {
        this.modalService.confirm({
            title: '您是否确认要移除角色' + role.name,
            onOk: () => this.doRemoveRole(role),
            onCancel() { }
        });
    }

    doRemoveRole(role: UserRole) {
        this._roleRemoving = true;
        this.userService.removeRole(this.user.code, role.name).subscribe(
            result => {
                this._roleRemoving = false;
                if (result.code !== 0) {
                    this.messageService.error('删除用户角色失败：' + result.message);
                    return;
                }
                this.loadRoles(this.user.code);
            },
            error => {
                this._roleRemoving = false;
                this.messageService.error('执行失败：' + error);
            }
        );
    }

    showResetPaswordModal(): void {
        const subscription = this.modalService.open({
            title: '重置密码',
            content: UserResetPasswordComponent,
            footer: false,
            componentParams: { user: this.user }
        });

        subscription.subscribe(result => {
            if (result === 'cancel' || result === 'OK') {
                subscription.destroy();
            }
        });
    }

    showAddRoleModal(): void {
        const subscription = this.modalService.open({
            title: '添加角色',
            content: UserRoleEditComponent,
            footer: false,
            componentParams: { user: this.user }
        });

        subscription.subscribe(result => {
            if (result === 'cancel') {
                subscription.destroy();
            } else if (result === 'OK') {
                subscription.destroy();
                this.loadRoles(this.user.code);
            }
        });
    }
}
