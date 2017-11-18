import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FrameComponent } from 'app/base/frame/frame.component';
import { HeadUserComponent } from 'app/base/shared/heard/head-user.component';
import { HeadComponent } from 'app/base/shared/heard/head.component';
import { MenuComponent } from 'app/base/shared/menu/menu.component';
import { LoginServiceImpl } from 'app/providers/login.service-impl';
import { FrameRoutingModule } from 'app/base/frame/frame-routing.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgZorroAntdModule,
        FrameRoutingModule,
    ],
    declarations: [
        FrameComponent,
        HeadComponent,
        HeadUserComponent,
        MenuComponent,
    ],

    exports: [FrameComponent],
    providers: [LoginServiceImpl]
})
export class FrameModule { }
