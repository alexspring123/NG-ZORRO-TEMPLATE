import { Route } from "@angular/router";
import { FrameComponent } from "app/base/frame/frame.component";
import { app_title } from "config/global-config";
import { ContentsRoutes } from "app/config/contents-routes";
import { ChangePasswordRoutes } from "app/base/change-password/change-password.routes";

export const FrameRoutes: Route[] = [
    {
        path: 'frame', component: FrameComponent, data: { title: app_title },
        children: [
            ...ChangePasswordRoutes,
            ...ContentsRoutes,
        ]
    },

];