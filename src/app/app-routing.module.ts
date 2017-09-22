import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginModule } from "app/base/login/login.module";
import { FrameModule } from "app/base/frame/frame.module";

// 根路由定义
const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }