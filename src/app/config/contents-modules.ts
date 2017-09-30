import { Route } from "@angular/router";

// 注入的全局模块
export const GlobalImportModule: any[] = [];

// 注入的全局服务
export const GlobalProviders: any[] = [];

//客户自定的模块注册
export const ContentsRoutes: Route[] = [
    { path: '', loadChildren: 'app/contents/role-demo/role.module#RoleModule' },
];