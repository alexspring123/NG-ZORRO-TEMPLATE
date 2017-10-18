import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { HttpResult } from "app/base/shared/model/http-result";
import { Page } from "app/base/shared/model/page";
import { Permission } from "app/base/shared/model/session";
import { SessionService } from "app/base/shared/session.service";

// 角色
export class Role {
    name: string;
    remark?: string;
}

// 查询条件
export class RoleFilter {
    nameLk?: string;
    pageNumber?: number = 0;
    pageSize?: number = 10;
}

// 角色用户
export class RoleUser {
    constructor(public code: string, public name: string) {
        this.code = code;
        this.name = name;
    }
}

@Injectable()
export class RoleService {

    constructor(private sessionService: SessionService) { }

    getList(filter: RoleFilter): Observable<HttpResult<Page<Role>>> {
        let roles: Role[] = RoleData.filter(r => {
            if (filter.nameLk != null && !r.name.includes(filter.nameLk))
                return false;
            return true;
        });

        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', this.getPageRole(roles, filter.pageNumber, filter.pageSize)));
        });
    }

    getRole(name: string): Observable<HttpResult<Role>> {
        let role = RoleData.find(r => name == r.name);
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', role));
        });
    }

    saveRole(role: Role): Observable<HttpResult<null>> {
        let duplicate = RoleData.find(r => name == r.name);
        if (duplicate)
            return new Observable(observer => {
                observer.next(new HttpResult(-1, '已经存在名称为' + role.name + '的角色', null));
            });
        RoleData.push(role);
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', null));
        });
    }

    saveModify(role: Role): Observable<HttpResult<null>> {
        let exists = RoleData.find(r => name == r.name);
        if (exists)
            exists.remark = role.remark;
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', null));
        });
    }

    delete(name: string): Observable<HttpResult<null>> {
        let index = RoleData.findIndex(r => name == r.name);
        if (index >= 0)
            RoleData.splice(index, 1);
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', null));
        });
    }

    getRoleUsers(roleName: string): Observable<HttpResult<Array<RoleUser>>> {
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', RoleUserData));
        });
    }

    getRolePermissions(roleName: string): Observable<HttpResult<Array<Permission>>> {
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', this.sessionService.getSession().permissions));
        });
    }

    coverRolePermissions(roleName: string, permissionCodes: Set<string>): Observable<HttpResult<null>> {
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', null));
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
    { name: '管理员' },
    { name: '采购员' },
    { name: '补货员' },
    { name: '理货员' },
    { name: '仓管' },
    { name: '品管' },
    { name: '仓库管理员' },
    { name: '品管经理' },
    { name: '仓管经理' },
    { name: '补货经理' },
    { name: '采购经理' },
    { name: '品控' },
    { name: '品控经理' },
    { name: '总经理' },
    { name: 'BI管理员' },
    { name: 'BI分析员' },
    { name: '战略分析员' },
    { name: '董事会秘书1' },
    { name: '董事会秘书2' },
    { name: '董事会秘书3' },
    { name: '董事会秘书4' },
    { name: '董事会秘书5' },
    { name: '董事会秘书6' },
];

const RoleUserData: RoleUser[] = [
    { code: '001', name: '员工01' },
    { code: '002', name: '员工02' },
    { code: '003', name: '员工03' },
    { code: '004', name: '员工04' },
    { code: '005', name: '员工05' },
    { code: '006', name: '员工06' },
    { code: '007', name: '员工07' },
    { code: '008', name: '员工08' },

];

export interface CPermission extends Permission {
    menuCode: string;
    menuName: string;
}

export const AllPermissions: Array<CPermission> = [
    { menuCode: "0101", menuName: "角色", code: "/role/view", name: "查看权" },
    { menuCode: "0101", menuName: "角色", code: "/role/create", name: "新建权" },
    { menuCode: "0101", menuName: "角色", code: "/role/edit", name: "修改权" },
    { menuCode: "0101", menuName: "角色", code: "/role/delete", name: "删除权" },

    { menuCode: "0102", menuName: "员工", code: "/user/view", name: "查看权" },
    { menuCode: "0102", menuName: "员工", code: "/user/create", name: "新建权" },
    { menuCode: "0102", menuName: "员工", code: "/user/edit", name: "编辑权" },
    { menuCode: "0102", menuName: "员工", code: "/user/delete", name: "删除权" },
    { menuCode: "0102", menuName: "员工", code: "/user/resetPwd", name: "重置密码权" },
];