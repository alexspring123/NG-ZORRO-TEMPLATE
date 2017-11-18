import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'login', component: LoginComponent, data: { title: '登录' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
