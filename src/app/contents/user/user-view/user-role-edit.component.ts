import { Component, Input, OnInit } from "@angular/core";
import { NzModalSubject, NzMessageService } from "ng-zorro-antd";
import { Page } from "app/base/shared/model/page";
import { User, UserRole, UserService } from "app/contents/user/user.service";
import { RoleFilter, RoleService } from "app/contents/role/role.service";

@Component({
    moduleId: module.id,
    selector: 'cmall-user-role-edit',
    styleUrls: ['user-role-edit.component.css'],
    templateUrl: 'user-role-edit.component.html'
})
export class UserRoleEditComponent implements OnInit {
    @Input()
    user: User = new User();

    filter: RoleFilter = new RoleFilter();
    page: Page<UserRole> = new Page<UserRole>();

    _allChecked = false;
    _indeterminate = false;

    _pageIndex: number = 1;
    _pageSize: number = 5;

    _loading: boolean = false;
    _saving: boolean = false;

    constructor(private subject: NzModalSubject,
        private messageService: NzMessageService,
        private roleService: RoleService,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.search(true);
    }

    resetForm(): void {
        this.filter = new RoleFilter();
    }

    search(reset: boolean = false) {
        if (reset)
            this._pageIndex = 1;

        this.filter.pageNumber = this._pageIndex - 1;
        this.filter.pageSize = this._pageSize;

        this._loading = true;
        this.roleService.getList(this.filter).subscribe(
            result => {
                this._loading = false;
                if (result.code != 0) {
                    this.messageService.error('加载角色列表失败：' + result.message);
                    return;
                }
                this.page = <any>result.data;
            },
            error => {
                this._loading = false;
                this.messageService.error('执行失败：' + error);
            });
    }

    _refreshStatus() {
        const allChecked = this.page.content.every(value => value.checked === true);
        const allUnChecked = this.page.content.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
    };

    _checkAll(value) {
        this.page.content.forEach(data => data.checked = value);
        this._refreshStatus();
    };


    cancel() {
        this.subject.destroy('cancel');
    }

    confirm() {
        this._saving = true;
        let roles: Array<string> = [];
        this.page.content.forEach(line => {
            if (line.checked) {
                roles.push(line.name);
            }
        });
        this.userService.addRoles(this.user.code, roles).subscribe(
            result => {
                this._saving = false;
                if (result.code != 0) {
                    this.messageService.error('添加角色失败：' + result.message);
                    return;
                }
                this.messageService.success('添加角色成功');
                this.subject.next('OK');
            },
            error => {
                this._saving = false;
                this.messageService.error('执行失败：' + error);
            }
        );
    }
}