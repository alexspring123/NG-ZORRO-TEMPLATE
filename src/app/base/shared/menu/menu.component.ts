import { Component, OnInit, Input } from '@angular/core';
import { menuConfig } from "config/global-config";
import { Router } from "@angular/router";
import { Session } from "app/base/shared/model/session";
import { SessionService } from "app/base/shared/session.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: []
})
export class MenuComponent implements OnInit {
    @Input()
    isCollapsed: boolean;
    session: Session;

    constructor(private router: Router, private sessionService: SessionService) {

    }

    ngOnInit() {
        this.session = this.sessionService.getSession();
    }

    public goPage(path: string): void {
        this.router.navigateByUrl('/frame' + path);
    }
}