import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { UserListComponent } from "./user-list/user-list.component";
import { UserRoutingModule } from "app/contents/user/user-routes.module";
import { UserViewComponent } from "app/contents/user/user-view/user-view.component";
import { UserResetPasswordComponent } from "app/contents/user/user-view/user-reset-password.component";
import { UserRoleEditComponent } from "app/contents/user/user-view/user-role-edit.component";
import { UserEditComponent } from "app/contents/user/user-edit/user-edit.component";
import { RoleService } from "app/contents/role/role.service";
import { UserService } from "app/contents/user/user.service";


@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgZorroAntdModule,
        UserRoutingModule
    ],
    declarations: [
        UserListComponent,
        UserViewComponent,
        UserEditComponent,
        UserResetPasswordComponent,
        UserRoleEditComponent
    ],
    exports: [],
    entryComponents: [UserResetPasswordComponent, UserRoleEditComponent],
    providers: [RoleService, UserService]
})
export class UserModule {
}