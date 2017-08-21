import { Component, OnInit } from '@angular/core';

class RoleFilter {
    code: string;
    name: string;
}

@Component({
    selector: 'app-role',
    template: `
        <router-outlet></router-outlet>
    `,
    styleUrls: []
})
export class RoleComponent implements OnInit {

    constructor() {

    }

    ngOnInit(): void {

    }
}
