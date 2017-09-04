import { Route } from "@angular/router";
import { LoginComponent } from "./login.component";

export const LoginRoutes: Route[] = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: { title: '登录' } },
];