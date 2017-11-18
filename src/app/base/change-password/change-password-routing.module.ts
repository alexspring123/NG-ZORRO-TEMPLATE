import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from 'app/base/change-password/change-password.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'changePwd', component: ChangePasswordComponent, data: { title: '修改密码' } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }
