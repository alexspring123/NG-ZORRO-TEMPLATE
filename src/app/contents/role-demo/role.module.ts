import { NgModule } from "@angular/core";
import { FrameComponent } from "app/base/frame/frame.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";
import { RoleService } from "app/contents/role-demo/role.service";
import { RoleComponent } from "app/contents/role-demo/role.component";
import { RoleListComponent } from "app/contents/role-demo/list/role-list.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
    ],
    declarations: [
        RoleComponent,
        RoleListComponent,
    ],

    exports: [RoleComponent],
    providers: [RoleService]
})
export class RoleModule {
}