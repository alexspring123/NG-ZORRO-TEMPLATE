import { Route } from "@angular/router";
import { FrameComponent } from "app/base/frame/frame.component";
import { ContentsRoutes } from "app/contents/contents-routes";
import { app_title } from "config/global-config";

export const FrameRoutes: Route[] = [
    {
        path: 'frame', component: FrameComponent, data: { title: app_title },
        children: [
            ...ContentsRoutes,
        ]
    },

];