import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleRoutingModule } from 'app/contents/role/role-routes.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RoleEditComponent } from 'app/contents/role/role-edit/role-edit.component';
import { RoleViewComponent } from 'app/contents/role/role-view/role-view.component';
import { PermissionEditComponent } from 'app/contents/role/role-view/permission-edit.component';
import { RoleService } from 'app/contents/role/role.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        RoleRoutingModule
    ],
    declarations: [
        RoleListComponent,
        RoleViewComponent,
        RoleEditComponent,
        PermissionEditComponent
    ],
    exports: [],
    entryComponents: [PermissionEditComponent],
    providers: [RoleService]
})
export class RoleModule { }
