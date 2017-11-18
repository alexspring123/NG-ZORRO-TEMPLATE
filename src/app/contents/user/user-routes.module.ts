import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserViewComponent } from 'app/contents/user/user-view/user-view.component';
import { UserEditComponent } from 'app/contents/user/user-edit/user-edit.component';

const routes: Routes = [
    {
        path: 'basic/user',
        children: [
            { path: '', component: UserListComponent },
            { path: 'create', component: UserEditComponent },
            { path: 'edit/:code', component: UserEditComponent },
            { path: 'view/:code', component: UserViewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
