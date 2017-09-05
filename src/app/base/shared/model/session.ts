//菜单
export interface Menu {
    title: string;//菜单标题
    path: string;//路由路径
    icon?: string; //图片
    subMenus: Array<Menu>; //子菜单
}

//权限
export interface Permission {
    code: string; //权限代码
    name: string; //权限名称
}

/**登录后返回的Session */
export interface Session {
    userCode: string;
    userName: string;
    token: string;
    menus: Array<Menu>;
    permissions: Array<Permission>;
}