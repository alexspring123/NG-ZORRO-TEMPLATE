import { Route } from "@angular/router";
import { RoleListComponent } from "app/contents/role-demo/list/role-list.component";
import { RoleComponent } from "app/contents/role-demo/role.component";

export const RoleRoutes: Route[] = [
    { path: 'role', redirectTo: '/frame/role/list', pathMatch: 'full' },
    {
        path: 'role', component: RoleComponent, data: { title: '角色' },
        children: [
            { path: 'list', component: RoleListComponent, data: { title: '角色列表' } },
        ]
    },
];