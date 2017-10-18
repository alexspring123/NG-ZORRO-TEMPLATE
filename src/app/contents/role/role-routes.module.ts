import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RoleListComponent } from "./role-list/role-list.component";
import { RoleEditComponent } from "app/contents/role/role-edit/role-edit.component";
import { RoleViewComponent } from "app/contents/role/role-view/role-view.component";

const routes: Routes = [
    {
        path: 'basic/role',
        children: [
            { path: '', component: RoleListComponent },
            { path: 'create', component: RoleEditComponent },
            { path: 'view/:name', component: RoleViewComponent },
            { path: 'edit/:name', component: RoleEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleRoutingModule { }
