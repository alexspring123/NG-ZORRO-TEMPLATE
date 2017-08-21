import { Component, OnInit } from '@angular/core';
import { menuConfig, loginConfig } from "config/global-config";

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  menuPlacement: string = 'top';
  isCollapsed: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
    let placement = menuConfig.placement;
    if (placement) {
      if (placement.trim().toLowerCase() == 'left')
        this.menuPlacement = 'left';
      if (placement.trim().toLowerCase() == 'top')
        this.menuPlacement = 'top';
    }
  }
}
