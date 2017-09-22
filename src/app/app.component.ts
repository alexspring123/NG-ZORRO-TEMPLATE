import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Route } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { app_title } from "config/global-config";
import { PermissionGurid } from "app/permission.gurid";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {

  }

  ngOnInit() {
    this.addTitle();
    this.addPermissionGurids();
  }

  //动态修改窗口标题（从路由的data['title']读取，如果路由没有配置data或title属性，默认取app_title）
  //参考文章https://toddmotto.com/dynamic-page-titles-angular-2-router-events
  private addTitle(): void {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild)
          route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        if (event && event['title'])
          return this.titleService.setTitle(app_title + '-' + event['title']);
        else
          return this.titleService.setTitle(app_title);
      });
  }

  // 动态增加权限守卫
  private addPermissionGurids(): void {
    this.router.config.forEach(route => {
      this.addPermissionGurid(route);
    });
  }

  // 给指定路由添加权限守卫
  private addPermissionGurid(route: Route): void {
    //只有配置了permisson的路由才增加权限守卫
    if (route.data && route.data['permission']) {
      if (!route.canActivate) route.canActivate = [];
      route.canActivate.push(PermissionGurid);
    }

    //存在下级路由，继续添加守卫
    if (route.children)
      route.children.forEach(r => this.addPermissionGurid(r));
  }
}