import { Component, OnInit, Input } from '@angular/core';
import { NzModalService } from "ng-zorro-antd";
import { SessionService } from "app/base/shared/session.service";
import { Session } from "app/base/shared/model/session";
import { HttpResult } from "app/base/shared/model/http-result";
import { LoginServiceImpl } from "app/providers/login.service-impl";
import { Router } from "@angular/router";

@Component({
    selector: 'app-head-user',
    template: `
        <nz-dropdown style="float:right;">
            <span class="welcome">欢迎您!</span>
            <a class="ant-dropdown-link" nz-dropdown>{{session.userName}}<i class="anticon anticon-down"></i></a>
            <ul nz-menu>
                <li nz-menu-item [nzDisable]="true">个人资料</li>
                <li nz-menu-item>
                    <a (click)="changePassword()">修改密码</a>
                </li>
                <li nz-menu-divider></li>
                <li nz-menu-item><a (click)="logout()">安全退出</a></li>
            </ul>
        </nz-dropdown>
    `,
    styles: [`
        .welcome{
            margin-right:5px;
            color:rgba(255,255,255,0.67)
        }
    `]
})
export class HeadUserComponent implements OnInit {
    session: Session;

    constructor(
        private router: Router,
        private confirmServ: NzModalService,
        private sessionService: SessionService,
        private loginService: LoginServiceImpl) {

    }

    ngOnInit() {
        this.session = this.sessionService.getSession();
    }

    logout(): void {
        this.confirmServ.confirm({
            title: '您是否确认要注销？',
            onOk: () => this.doLogout(),
            onCancel() { }
        });
    }

    changePassword(): void {
        this.router.navigateByUrl('/frame/changePwd');
    }

    private doLogout(): void {
        this.loginService.logout(this.session.token).subscribe(
            (result: HttpResult<any>) => {
                if (result.code != 0) {
                    window.alert('注销失败：' + result.message);
                    return;
                }
                this.sessionService.removeSession();
                this.router.navigateByUrl('/login');
            },
            (error) => window.alert(error));
    }
}