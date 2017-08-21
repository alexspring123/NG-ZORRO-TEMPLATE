import { Route } from "@angular/router";
import { RoleRoutes } from "app/contents/role-demo/role.routes";

//客户自定的路由注册
export const ContentsRoutes: Route[] = [
    ...RoleRoutes,
];