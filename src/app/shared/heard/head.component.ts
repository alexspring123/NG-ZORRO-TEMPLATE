import { Component, OnInit, Input } from '@angular/core';
import { loginConfig } from "config/global-config";
import { Session } from "app/shared/model/session";
import { SessionService } from "app/shared/session.service";
import { Router } from "@angular/router";
@Component({
    selector: 'app-head',
    templateUrl: './head.component.html',
    styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

    @Input()  //是否显示菜单
    showMenu: boolean = false;

    @Input() // 当showMenu=false时，显示的标题
    title: string;

    session: Session;

    constructor(
        private router: Router,
        private sessionService: SessionService) {
        this.title = loginConfig.form_title;
        this.session = sessionService.getSession();
    }

    ngOnInit() {
    }

    public goPage(path: string): void {
        this.router.navigateByUrl('/frame' + path);
    }
}