import { RouterModule, Routes } from "@angular/router";
import { FrameComponent } from "app/base/frame/frame.component";
import { NgModule } from "@angular/core";
import { ContentsRoutes } from "app/config/contents-modules";
import { ChangePasswordModule } from "app/base/change-password/change-password.module";

export function getChangePasswordModule(): any {
    return ChangePasswordModule;
}

const routes: Routes = [
    {
        path: 'frame', component: FrameComponent,
        children: [
            { path: '', loadChildren: getChangePasswordModule },
            ...ContentsRoutes
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrameRoutingModule { }