import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { SessionService } from "app/base/shared/session.service";

//路由权限守卫
@Injectable()
export class PermissionGurid implements CanActivate {
    constructor(private sessionService: SessionService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let pCodes: string[] = route.data ? route.data['permission'] : null;
        //路由未配置permission属性时直接返回true
        if (!pCodes) return true;

        let permissions = this.sessionService.getSession().permissions;
        let success = permissions.some(p => pCodes.some(code => p.code == code));

        if (!success) {
            window.alert('缺少权限：' + pCodes.join(','));
        }
        return success;
    }
}