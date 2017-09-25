# NG-ZORRO-TEMPLATE
NG-ZORRO-TEMPLATE是基于阿里angular组件[NG-ZORRO](https://ng.ant.design/#/docs/angular/introduce)开发的一套企业后台管理系统模板。目的是简单、方便、快速的搭建一个企业后台管理系统。

[在线Deom](https://alexspring123.github.io/NG-ZORRO-TEMPLATE)

模板项目提供了登录页面、动态菜单、session存储、权限路由守卫等功能，您只需要开发对应的后台服务，即可实现一个简单的后台管理系统；

为了方便大家在没有后台服务时也能使用，项目提供了一些fake和demo，可以直接使用。

# 目录
* [截图](#截图)
* [安装运行](#安装运行)
* [配置说明](#us配置说明age)
    * [系统配置](#系统配置)
    * [登录页面配置](#登录页面配置)
    * [菜单配置](#菜单配置)
    * [本地存储配置](#本地存储配置)
* [对接自己后台登录服务](#对接自己后台登录服务)
* [设置浏览器标题](#设置浏览器标题)
* [给路由添加权限守卫](#给路由添加权限守卫)
* [目录说明](#目录说明)
* [升级模板说明](#升级模板说明)
* [部署说明](#部署说明)

# 截图
登录界面
![登录界面](/doc/screen-snapshots/login-snapshot.png "登录界面")
顶部菜单
![顶部菜单](/doc/screen-snapshots/top-memu-snapshot.png "顶部菜单")
左边菜单-展开
![左边菜单-展开](/doc/screen-snapshots/left-menu-snapshot.png "左边菜单-展开")
左边菜单-折叠
![左边菜单-折叠](/doc/screen-snapshots/left-menu-snapshot2.png "左边菜单-折叠")
修改密码
![修改密码](/doc/screen-snapshots/change-pwd.png "修改密码")

# 安装运行
## 准备工作
- 安装git
- 安装npm
- 安装最新版[angular-cli](https://github.com/angular/angular-cli)

## 下载模板代码
直接clone代码
```
git clone https://github.com/alexspring123/NG-ZORRO-TEMPLATE.git
npm install
```
> 如果npm速度较慢，大家可以安装使用[cnpm](https://github.com/cnpm/cnpm)

然后在console中执行下面命令
```
ng s --open
```
此时浏览器就自动打开了模板网站，是否特别简单。

# 配置说明
模板网站允许通过配置来更改网站的外观。所有配置项都存放在/src/config/global-config.ts文件中

## 系统配置
配置项 | 说明
--- | ------
app_title | 系统名称，显示在浏览器的title中（浏览器的标签）<br>如果路由中配置了data:{title:'xxxx'}参数，系统激活路由时会自动替换为title参数的取值，例如模板中角色样例模块RoleRoutes

## 登录页面配置
登录页面配置对应配置文件loginConfig类中

 配置项 | 说明 
 --- | ------
 background_image | 登录页面背景图片，图片一般放在/src/assets目录中
 form_title | 登录表单的标题，最好控制在8个汉字以内

## 菜单配置
所有菜单相关配置存放在配置文件menuConfig类中

配置项 | 说明
--- | ------
placement | 取值'left'或'top'。<br>设置为'left'，菜单显示在左侧<br>设置为'top'，菜单显示在顶部

## 本地存储配置
模板项目为大家提供了本地session的存储功能，存放在配置文件的sessionConfig类中

配置项 | 说明
--- | ------
store_key | 本地session存储的key<br>系统会自动将session存放在本地的localstorage中

# 对接自己后台登录服务
目前系统严格定义了后台服务需要返回的接口格式如下：
```js
/**预定义服务 */
export interface LoginService {
    /**
     * 登录
     */
    login(loginData: { login: string, password: string }): Observable<HttpResult<Session>>;

    /**
     * 注销
     * userCode：当前登录用户代码
     * token：当前登录的token
     * userCode和token必须有一个不为Null。
     * 登录后服务端会生成一个token并返回给界面，此时只需要传入token一个参数服务端即可完成注销
     */
    logout(token: string): Observable<HttpResult<any>>;

    /**
     * 修改密码
     * 处于安全，session不会保存用户的密码，因此修改密码时需要传入原始密码，服务端需要对原始密码和token进行验证
     * 服务端成功后不用返回data
     */
    changePassword(data: { token: string, oldPassword: string, newPassword: string }): Observable<HttpResult<any>>;
}
```
http远程调用返回angular的Observable异步对象（建议大家也采用此方式）
Ï
其中的HttpResult和Session是系统定义的数据格式：
```js 
export class HttpResult<T> {
    constructor(public code: number, public message: string, public data: T) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
```

```js
//菜单
export interface Menu {
    title: string;//菜单标题
    path: string;//路由路径
    icon?: string; //图片
    subMenus?: Array<Menu>; //子菜单
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
    token?: string;
    menus: Array<Menu>;
    permissions: Array<Permission>;
}
```
上面只是解释了登录用到的接口和数据结果，实际开发中大家只需要替换/src/app/providers/login.service-impl.ts文件的实现即可
> **特别注意：**  此文件名称和位置不能更改

# 设置浏览器标题
模板提供了为每个路由页面单独设置浏览器标题的功能。  
设置方法：在路由定义中增加data参数，并在其中定义title属性，例如
```typescript
export const RoleRoutes: Route[] = [
    {
        path: 'role', component: RoleComponent, data: { title: '角色' },
        children: [
            { path: 'list', component: RoleListComponent, data: { title: '角色列表', permission: ['/role1/view'] } },
        ]
    },
];
```
当路由导航到 *role/list* 页面时，浏览器标题显示为：**智能照明管理系统-角色列表**  
其中“智能照明管理系统”全局选项app_title的值  
如果某个路由未设置data['title']属性，那么浏览器标题默认为app_title的值

# 给路由添加权限守卫
管理系统一般会根据用户权限来控制能够进入某个模块，通常做法是编写一个路由守卫，然后添加到路由定义中；
为了方便大家使用，模板提供了默认的路由权限守卫[PermissionGurid](./src/app/permission.gurid.ts)，大家只需要在路由定义中增加data参数，并配置permission字段即可，例如
```typescript
export const RoleRoutes: Route[] = [
    { path: 'role', redirectTo: '/frame/role/list', pathMatch: 'full' },
    {
        path: 'role', component: RoleComponent, data: { title: '角色' },
        children: [
            { path: 'list', component: RoleListComponent, data: { title: '角色列表', permission: ['/role/view'] } },
        ]
    },
];
```
permission字段是一个字符串数组，可以配置多个权限，目前实现的功能为，只要用户包含其中一个权限，守卫即放行，而不是同时具有所有权限。  
如果用户没有permission中定义的任一个权限，那么系统将不跳转，并且谈框提示缺少权限。

# 目录说明
模板项目的目录结构定义为

目录或文件 | 用户是否可更改 | 说明
--- | --- | ------
/doc/\*.\* | 可以删除 | 记录项目相关的文档
/src/\*.\* | 不可更改 | src下面的文件（不包含子目录）属于模板项目
/src/assets/ | 可以更改 | 此目录下面是用户的静态资源，比如图片、文件等，用户可以自由修改
/src/config/ | 可以更改 | 此目录下存放的是系统配置文件，用户可以更改，但是不能删除任何文件
/src/environments/ | 可以更改| 此目录是anguler-cli标准的环境变量文件，可以按需修改
/src/app/base/ |  不可更改 | 存放项目的登录页面、主页面、修改密码页面、注销页面等，用户不可修改
/src/app/providers/ | 可以修改，但是不能删除 | 存放模板定义好的接口实现，用户可以修改实现，但是不能修改文件名、类名和实现的接口
/src/app/contents/ | 可以任何修改 | 存放用户自己的模块代码，可以任意修改
/src/app/config/ | 可以修改，但是不能删除 | 存放用户模块和路由的注册文件

# 升级模板说明
- 下载最新的项目文件

- 替换如下文件
> /src/\*.html \*.ts \*.css \*.json <br>
> /src/app/base/，整个目录覆盖

- 比对并合并如下文件
> /src/config/global-config.ts

# 部署说明
开发调试好后需要部署到服务器上运行，我这里仅介绍apache的部署方式（其他如Nginx，IIS等类似）  
## 部署在服务器根目录
编译制品
```
ng build -prod -aot
```
将编译结果/dist目录中的文件直接复制到apache的根目录(linux上的默认目录为/var/www/html)  
启动apache，打开浏览器访问http://IP:端口，就可以看到你的项目界面了

## 部署在服务器的子目录
比如想将项目部署到apache的subDir子目录中  
编译制品
```
ng build -prod -aot -bh /subDir/ -d /subDir
```
**其中subDir是apache中的目录名称，你可以替换成你自己的目录名称**  
将编译结果/dist目录中的文件直接复制到apache的subDir目录(linux上的默认目录为/var/www/html/subDir)

配置项目目录
打开apache的配置文件，ubuntu上是/etc/apache2/apache2.conf，添加如下代码
```
<Directory /subDir>
        Options FollowSymLinks
        AllowOverride all
        allow from all
</Directory>
```
启动apache，打开浏览器访问：http://IP:端口/subDir 可以正常访问

## 解决浏览器刷新问题
上面部署可以正常访问，但是刷新浏览器时会报错
> The requested URL /***** was not found on this server
原因是，正常访问时url被angular接管，[浏览器并没有向服务器发送请求](https://angular.cn/guide/router#附录：locationstrategy以及浏览器url样式)。当刷新浏览器时，由浏览器接管url，会向服务端发送请求。而服务器上并没有人处理，从而报Not found错误。  
要解决这个问题，我们只需要让服务器处理这个请求即可，下面以ubuntu上的apache为例。

### 打开apache的路径重写功能
激活mod_rewrite模块
```
sudo a2enmod rewrite
```
重新apache生效
```
sudo systemctl restart apache2
```
### 打开apache目录的重写开关
修改/etc/apache2/apache2.conf文件  
如果部署在根目录，找到下面的配置
```
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
</Directory>
```
将其中 *AllowOverride None* 改为 **AllowOverride all**，如果没有就增加一条。  
如果部署在子目录subDir中，找到下面的配置
```
<Directory /subDir>
        Options FollowSymLinks
        AllowOverride all
        allow from all
</Directory>
```
将其中 *AllowOverride None* 改为 **AllowOverride all**，如果没有就增加一条。  

### 增加.htaccess配置
如果部署在根目录，在/var/www/html/下新建.htaccess文件，内容为
```
RewriteEngine On
# If an existing asset or directory is requested go to it as it is
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html
RewriteRule ^ /index.html
```
如果部署在子目录/var/www/html/subDir中，则在subDir目录中新增.htaccess文件，内容为
```
RewriteEngine On
# If an existing asset or directory is requested go to it as it is
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html
RewriteRule ^ /subDir/index.html
```
*修改.htaccess文件不需要重启apache*


