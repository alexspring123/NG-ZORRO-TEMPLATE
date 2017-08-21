import { Component, OnInit, Input } from '@angular/core';
import { loginConfig } from "config/global-config";

@Component({
    selector: 'app-head-user',
    template: `
        <nz-dropdown style="float:right;">
            <span class="welcome">欢迎您!</span>
            <a class="ant-dropdown-link" nz-dropdown>程新文<i class="anticon anticon-down"></i></a>
            <ul nz-menu>
                <li nz-menu-item [nzDisable]="true">个人资料</li>
                <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="#">修改密码</a>
                </li>
                <li nz-menu-divider></li>
                <li nz-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="#">注销</a>
                </li>
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

    constructor() {

    }

    ngOnInit() {
    }
}