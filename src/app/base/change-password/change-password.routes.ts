import { Route } from "@angular/router";
import { ChangePasswordComponent } from "app/base/change-password/change-password.component";

export const ChangePasswordRoutes: Route[] = [
    { path: 'changePwd', component: ChangePasswordComponent, data: { title: '修改密码' } }
];