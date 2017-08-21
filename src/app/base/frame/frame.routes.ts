import { Route } from "@angular/router";
import { FrameComponent } from "app/base/frame/frame.component";
import { app_title } from "config/global-config";
import { ContentsRoutes } from "app/config/contents-routes";

export const FrameRoutes: Route[] = [
    {
        path: 'frame', component: FrameComponent, data: { title: app_title },
        children: [
            ...ContentsRoutes,
        ]
    },

];