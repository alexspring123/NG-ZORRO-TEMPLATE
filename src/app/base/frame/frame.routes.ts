import { Route } from "@angular/router";
import { FrameComponent } from "app/base/frame/frame.component";
import { ContentsRoutes } from "app/config/contents-routes";
import { ChangePasswordRoutes } from "app/base/change-password/change-password.routes";

export const FrameRoutes: Route[] = [
    {
        path: 'frame', component: FrameComponent,
        children: [
            ...ChangePasswordRoutes,
            ...ContentsRoutes,
        ]
    },

];