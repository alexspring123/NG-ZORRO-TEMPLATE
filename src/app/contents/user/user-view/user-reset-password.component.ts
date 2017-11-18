import { Component, Input } from '@angular/core';

import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { User, UserService } from 'app/contents/user/user.service';

@Component({
    moduleId: module.id,
    selector: 'app-cmall-user-reset-password',
    templateUrl: 'user-reset-password.component.html',
    styleUrls: ['user-reset-password.component.css']
})
export class UserResetPasswordComponent {
    @Input()
    user: User = new User();

    password: string;
    _saving = false;

    constructor(private subject: NzModalSubject,
        private messageService: NzMessageService,
        private userService: UserService) { }

    cancel() {
        this.subject.destroy('cancel');
    }

    confirm() {
        this._saving = true;
        this.userService.resetPassword(this.user.code, this.password).subscribe(
            result => {
                this._saving = false;
                if (result.code !== 0) {
                    this.messageService.error('重置用户密码失败：' + result.message);
                    return;
                }
                this.messageService.success('重置用户成功');
                this.subject.next('OK');
            },
            error => {
                this._saving = false;
                this.messageService.error('执行失败：' + error);
            }
        );
    }
}
