import { Routes } from "@angular/router";
import { LoginRoutes } from "./base/login/login.routes";
import { FrameRoutes } from "app/base/frame/frame.routes";

export const appRoutes: Routes = [
    ...LoginRoutes,
    ...FrameRoutes,
];