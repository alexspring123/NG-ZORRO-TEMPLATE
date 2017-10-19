import { RouterModule, Routes } from "@angular/router";
import { FrameComponent } from "app/base/frame/frame.component";
import { NgModule } from "@angular/core";
import { ContentsRoutes } from "app/config/contents-modules";
import { PermissionGurid } from "app/permission.gurid";

const routes: Routes = [
    {
        path: 'frame',
        component: FrameComponent,
        canActivateChild: [PermissionGurid],
        children: [
            { path: '', loadChildren: '../change-password/change-password.module#ChangePasswordModule' },
            ...ContentsRoutes
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrameRoutingModule { }