import { NgModule } from "@angular/core";
import { FrameComponent } from "app/base/frame/frame.component";
import { HeadComponent } from "app/shared/heard/head.component";
import { MenuComponent } from "app/shared/menu/menu.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";
import { HeadUserComponent } from "app/shared/heard/head-user.component";
import { ContentsModules } from "app/contents/contents-modules";
import { RouterModule } from "@angular/router";

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