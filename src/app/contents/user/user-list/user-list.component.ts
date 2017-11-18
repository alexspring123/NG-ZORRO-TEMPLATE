import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

import { Page } from 'app/base/shared/model/page';
import { UserFilter, QUser, UserService } from 'app/contents/user/user.service';

@Component({
    moduleId: module.id,
    selector: 'app-cmall-user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
    filter: UserFilter = new UserFilter();
    page: Page<QUser> = new Page<QUser>();

    _pageIndex = 1;
    _pageSize = 10;
    _loading = false;
    _deleting = false;

    constructor(
        private modalService: NzModalService,
        private messageService: NzMessageService,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.search(true);
    }

    resetForm(): void {
        this.filter = new UserFilter();
    }

    search(reset: boolean = false): void {
        if (reset) {
            this._pageIndex = 1;
        }

        this.filter.pageNumber = this._pageIndex - 1;
        this.filter.pageSize = this._pageSize;

        this._loading = true;
        this.userService.getList(this.filter).subscribe(
            result => {
                this._loading = false;
                if (result.code !== 0) {
                    this.messageService.error('加载用户列表失败：' + result.message);
                    return;
                }
                this.page = result.data;
            },
            error => {
                this._loading = false;
                this.messageService.error('执行失败：' + error);
            }
        );
    }

    delete(user: QUser): void {
        this._deleting = true;
        this.userService.delete(user.code).subscribe(
            result => {
                this._deleting = false;
                if (result.code !== 0) {
                    this.messageService.error('删除用户失败：' + result.message);
                    return;
                }
                this.messageService.success('删除用户成功');
                this.search();
            },
            error => {
                this._deleting = false;
                this.messageService.error('执行失败：' + error);
            }
        );
    }
}
