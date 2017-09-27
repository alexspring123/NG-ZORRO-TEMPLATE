import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginModule } from "app/base/login/login.module";
import { FrameModule } from "app/base/frame/frame.module";

export function getLoginModule(): any { return LoginModule; }
export function getFrameModule(): any { return FrameModule; }

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', loadChildren: getLoginModule },
    { path: '', loadChildren: getFrameModule },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }