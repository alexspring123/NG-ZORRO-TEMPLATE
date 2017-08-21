import { NgModule } from "@angular/core";
import { FrameComponent } from "app/base/frame/frame.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ContentsModules } from "app/config/contents-modules";
import { HeadUserComponent } from "app/base/shared/heard/head-user.component";
import { HeadComponent } from "app/base/shared/heard/head.component";
import { MenuComponent } from "app/base/shared/menu/menu.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgZorroAntdModule,

        ...ContentsModules,
    ],
    declarations: [
        FrameComponent,
        HeadComponent,
        HeadUserComponent,
        MenuComponent,
    ],

    exports: [FrameComponent],
    providers: []
})
export class FrameModule {
}