import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { HttpResult } from "app/base/shared/model/http-result";
import { Page } from "app/base/shared/model/page";

export class UserFilter {
    codeEq?: string;
    nameLk?: string;
    mobileLk?: string;
    pageNumber?: number = 0;
    pageSize?: number = 10;
}

export class QUser {
    code?: string;
    name?: string;
    mobile?: string;
    checked?: boolean = false;
}

export class User {
    code?: string;
    login?: string;
    name?: string;
    mobile?: string;
    hasOperateView?: boolean = false;
    hasPropertyView?: boolean = false;
    hasBrandView?: boolean = false;
    remark?: string;
}

export class UserRole {
    name?: string;
    checked?: boolean = false;
    remark?: string;
}

@Injectable()
export class UserService {

    constructor() { }

    public getList(filter: UserFilter): Observable<HttpResult<Page<QUser>>> {
        let roles: QUser[] = userData.filter(r => {
            if (filter.codeEq != null && r.code != filter.codeEq)
                return false;
            if (filter.nameLk != null && !r.name.includes(filter.nameLk))
                return false;
            return true;
        });

        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', this.getPageRole(roles, filter.pageNumber, filter.pageSize)));
        });
    }

    public save(user: User): Observable<HttpResult<string>> {
        if (user.code) {
            let u = userData.find(u => u.code == user.code);
            if (u) {
                u.name = user.name;
                u.login = user.login;
                u.mobile = user.mobile;
                u.hasOperateView = user.hasOperateView;
                u.hasPropertyView = user.hasPropertyView;
                u.hasBrandView = user.hasBrandView;
                u.remark = user.remark;
            }

            return new Observable(observer => {
                observer.next(new HttpResult(0, 'OK', user.code));
            });
        } else {
            user.code = (parseInt(userData[userData.length - 1].code) + 1).toString();
            userData.push(user);
            return new Observable(observer => {
                observer.next(new HttpResult(0, 'OK', user.code));
            });
        }
    }

    public delete(userCode: string): Observable<HttpResult<boolean>> {
        let index = userData.findIndex(u => u.code == userCode);
        if (index >= 0)
            userData.splice(index, 1);
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', true));
        });
    }

    public getUser(code: string): Observable<HttpResult<User>> {
        let user = userData.find(u => u.code == code);
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', user));
        });
    }

    public addRoles(code: string, roles: Array<string>): Observable<HttpResult<boolean>> {
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', true));
        });
    }

    public removeRole(userCode: string, roleName: string): Observable<HttpResult<boolean>> {
        let index = userRoleData.findIndex(r => r.name == roleName);
        if (index >= 0)
            userRoleData.splice(index, 1);

        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', true));
        });
    }

    public getUserRoles(code: string): Observable<HttpResult<Array<UserRole>>> {
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', userRoleData));
        });
    }

    public resetPassword(code: string, password: string): Observable<HttpResult<boolean>> {
        return new Observable(observer => {
            observer.next(new HttpResult(0, 'OK', true));
        });
    }

    private getPageRole(roles?: QUser[], pageNumber?: number, pageSize?: number): Page<QUser> {
        pageNumber = pageNumber ? pageNumber : 0;
        pageSize = pageSize ? pageSize : 10;
        roles = roles ? roles : [];

        let page: Page<QUser> = new Page<QUser>();
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

const userData: User[] = [
    { code: '001', name: '员工001', login: 'login001' },
    { code: '002', name: '员工002', login: 'login002' },
    { code: '003', name: '员工003', login: 'login003' },
    { code: '004', name: '员工004', login: 'login004' },
    { code: '005', name: '员工005', login: 'login005' },
    { code: '006', name: '员工006', login: 'login006' },
    { code: '007', name: '员工007', login: 'login007' },
    { code: '008', name: '员工008', login: 'login008' },
    { code: '009', name: '员工009', login: 'login009' },
    { code: '010', name: '员工010', login: 'login010' },
    { code: '011', name: '员工011', login: 'login011' },
    { code: '012', name: '员工012', login: 'login012' },
    { code: '013', name: '员工013', login: 'login013' },
    { code: '014', name: '员工014', login: 'login014' },
    { code: '015', name: '员工015', login: 'login015' },
];

const userRoleData: UserRole[] = [
    { name: '管理员' },
    { name: '采购员' },
    { name: '补货员' },
    { name: '哈哈哈' },
];