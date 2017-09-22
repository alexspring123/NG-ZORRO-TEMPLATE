import { RouterModule, Routes, Route } from "@angular/router";
import { FrameComponent } from "app/base/frame/frame.component";
import { NgModule } from "@angular/core";
import { ContentsModules } from "app/config/contents-modules";
import { ChangePasswordModule } from "app/base/change-password/change-password.module";

// Frame路由
const frameRoutes: Routes = [
    { path: 'frame', component: FrameComponent },
];
// 添加修改密码路由
frameRoutes[0].children = [{ path: '', loadChildren: () => ChangePasswordModule }];
// 动态增加自定义模块路由
frameRoutes[0].children.push(...ContentsModules.map<Route>(m => { return { path: '', loadChildren: () => m } }));

@NgModule({
    imports: [RouterModule.forChild(frameRoutes)],
    exports: [RouterModule]
})
export class FrameRoutingModule { }