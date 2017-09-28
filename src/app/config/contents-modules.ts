import { RoleModule } from "app/contents/role-demo/role.module";
import { Route } from "@angular/router";
import { SessionService } from "app/base/shared/session.service";

// 注入的全局模块
export const GlobalImportModule: any[] = [];

// 注入的全局服务
export const GlobalProviders: any[] = [];

//客户自定的模块注册
export const ContentsRoutes: Route[] = [
    { path: '', loadChildren: getRoleModule },
];
export function getRoleModule(): any { return RoleModule; }

