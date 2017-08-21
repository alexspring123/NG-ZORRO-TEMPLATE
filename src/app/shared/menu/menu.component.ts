import { Component, OnInit, Input } from '@angular/core';
import { Session } from "app/shared/model/session";
import { SessionService } from "app/shared/session.service";
import { menuConfig } from "config/global-config";
import { Router } from "@angular/router";

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