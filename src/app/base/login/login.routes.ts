import { Route } from "@angular/router";
import { LoginComponent } from "./login.component";
import { app_title } from "config/global-config";

export const LoginRoutes: Route[] = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: { title: app_title } },
];