import { Injectable } from '@angular/core';
import { sessionConfig } from 'config/global-config';
import { Session } from 'app/base/shared/model/session';

@Injectable()
export class SessionService {
    private session: Session;

    isLogin() {
        return this.getSession() != null;
    }

    getUserCode(): string {
        if (this.getSession()) {
            return this.session.userCode;
        } else {
            return null;
        }
    }

    putSession(session: Session) {
        this.session = session;
        if (this.session) {
            window.sessionStorage.setItem(sessionConfig.store_key, JSON.stringify(session));
        } else {
            window.sessionStorage.removeItem(sessionConfig.store_key);
        }
    }

    getSession(): Session {
        if (!this.session) {
            this.session = JSON.parse(window.sessionStorage.getItem(sessionConfig.store_key));
        }
        return this.session;
    }

    removeSession() {
        this.session = null;
        window.sessionStorage.removeItem(sessionConfig.store_key);
    }

    hasPermission(permissionCode: string): boolean {
        if (!permissionCode) {
            return false;
        }

        const session = this.getSession();
        return session ? session.permissions.some(p => p.code === permissionCode) : false;
    }
}
