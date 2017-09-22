import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { RoleFilter } from "app/contents/role-demo/list/role-list.component";
import { Role } from "app/contents/role-demo/role";
import { Page } from "app/base/shared/model/page";
import { HttpResult } from "app/base/shared/model/http-result";

@Injectable()
export class RoleService {
    constructor() {
    }

    getList(filter: RoleFilter): Observable<HttpResult<Page<Role>>> {
        let roles: Role[] = RoleData.filter(r => {
            if (filter.code != null && r.code != filter.code)
                return false;
            if (filter.name != null && !r.name.includes(filter.name))
                return false;
            return true;
        });

        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', this.getPageRole(roles, filter.pageNumber, filter.pageSize)));
        });
    }

    private getPageRole(roles?: Role[], pageNumber?: number, pageSize?: number): Page<Role> {
        pageNumber = pageNumber ? pageNumber : 0;
        pageSize = pageSize ? pageSize : 10;
        roles = roles ? roles : [];

        let page: Page<Role> = new Page<Role>();
        page.totalElements = roles.length;
        page.totalPages = Math.floor(roles.length / pageSize);
        page.pageNumber = pageNumber;
        page.pageSize = pageSize;

        let startIndex = pageNumber * pageSize;
        let endIndex = Math.min(startIndex + pageSize, roles.length);
        page.content = roles.slice(startIndex, endIndex);
        page.hasContent = page.content.length > 0;
        page.hasNext = endIndex < roles.length;
        return page;
    }
}



const RoleData: Role[] = [
    { code: '0001', name: '管理员' },
    { code: '0002', name: '采购员' },
    { code: '0003', name: '补货员' },
    { code: '0004', name: '理货员' },
    { code: '0005', name: '仓管' },
    { code: '0006', name: '品管' },
    { code: '0007', name: '仓库管理员' },
    { code: '0008', name: '品管经理' },
    { code: '0009', name: '仓管经理' },
    { code: '0010', name: '补货经理' },
    { code: '0011', name: '采购经理' },
    { code: '0012', name: '品控' },
    { code: '0013', name: '品控经理' },
    { code: '0014', name: '总经理' },
    { code: '0015', name: 'BI管理员' },
    { code: '0016', name: 'BI分析员' },
    { code: '0017', name: '战略分析员' },
    { code: '0018', name: '董事会秘书1' },
    { code: '0019', name: '董事会秘书2' },
    { code: '0020', name: '董事会秘书3' },
    { code: '0021', name: '董事会秘书4' },
    { code: '0022', name: '董事会秘书5' },
    { code: '0023', name: '董事会秘书6' },
];