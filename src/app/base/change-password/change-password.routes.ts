import { Route } from "@angular/router";
import { app_title } from "config/global-config";
import { ChangePasswordComponent } from "app/base/change-password/change-password.component";

export const ChangePasswordRoutes: Route[] = [
    { path: 'changePwd', component: ChangePasswordComponent, data: { title: app_title + '-修改密码' } }
];