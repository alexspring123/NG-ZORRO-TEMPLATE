import { Component, OnInit } from '@angular/core';

class RoleFilter {
    code: string;
    name: string;
}

@Component({
    selector: 'app-role',
    template: '<router-outlet></router-outlet>'
})
export class RoleComponent implements OnInit {

    constructor() {

    }

    ngOnInit(): void {

    }
}
