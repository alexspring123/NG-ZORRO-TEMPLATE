import { Route } from "@angular/router";
import { ContentsRoutes } from "app/contents/contents-routes";
import { RoleListComponent } from "app/contents/role-demo/list/role-list.component";
import { RoleComponent } from "app/contents/role-demo/role.component";
import { app_title } from "config/global-config";

export const RoleRoutes: Route[] = [
    { path: 'role', redirectTo: '/frame/role/list', pathMatch: 'full' },
    {
        path: 'role', component: RoleComponent, data: { title: app_title + '-角色模块' },
        children: [
            { path: 'list', component: RoleListComponent, data: { title: app_title + '-角色列表' } },
        ]
    },
];