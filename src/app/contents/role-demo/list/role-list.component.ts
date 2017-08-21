import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Role } from "app/contents/role-demo/role";
import { RoleService } from "app/contents/role-demo/role.service";
import { PageFilter } from "app/base/shared/model/page-filter";
import { Page } from "app/base/shared/model/page";
import { HttpResult } from "app/base/shared/model/http-result";

export class RoleFilter extends PageFilter {
    code: string;
    name: string;
}

@Component({
    selector: 'app-role',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
    filter: RoleFilter = new RoleFilter();
    validateForm: FormGroup;

    page: Page<Role> = new Page<Role>();
    _displayData = [];
    _loading: boolean = false;
    _allChecked: boolean = false;
    _indeterminate: boolean = false;
    _disabledButton: boolean = true;
    _checkedNumber: number = 0;

    constructor(private fb: FormBuilder, private roleService: RoleService) {

    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({});
        this.validateForm.addControl('code', new FormControl());
        this.validateForm.addControl('name', new FormControl());

        this.search();
    }

    resetForm() {
        this.validateForm.reset();
    }

    _displayDataChange($event) {
        this._displayData = $event;
        this._refreshStatus();
    };

    _refreshStatus() {
        const allChecked = this._displayData.every(value => value.checked === true);
        const allUnChecked = this._displayData.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
        this._disabledButton = !this._displayData.some(value => value.checked);
        this._checkedNumber = this._displayData.filter(value => value.checked).length;
    };

    _checkAll(value) {
        if (value) {
            this._displayData.forEach(data => data.checked = true);
        } else {
            this._displayData.forEach(data => data.checked = false);
        }
        this._refreshStatus();
    };

    public search(): void {
        this._loading = true;
        this.filter.pageNumber = this.page.pageNumber;
        this.filter.pageSize = this.page.pageSize;
        this.roleService.getList(this.filter).subscribe(
            (result: HttpResult<Page<Role>>) => {
                this._loading = false;
                if (result.code != 0) {
                    window.alert(result.message);
                    return;
                }
                this.page = result.data;
            },
            (error) => {
                window.alert(error);
                this._loading = false;
            }
        );
    }
}
