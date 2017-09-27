import { RoleModule } from "app/contents/role-demo/role.module";
import { Route } from "@angular/router";

//客户自定的模块注册
export const ContentsRoutes: Route[] = [
    { path: '', loadChildren: getRoleModule },
];

export function getRoleModule(): any { return RoleModule; }