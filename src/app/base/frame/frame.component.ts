import { Component, OnInit } from '@angular/core';
import { menuConfig, loginConfig, copyright } from 'config/global-config';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  menuPlacement = 'top';
  copyright: string;
  isCollapsed = false;

  constructor() {

  }

  ngOnInit(): void {
    const placement = menuConfig.placement;
    if (placement) {
      if (placement.trim().toLowerCase() === 'left') {
        this.menuPlacement = 'left';
      } else if (placement.trim().toLowerCase() === 'top') {
        this.menuPlacement = 'top';
      }
    }
    this.copyright = copyright;
  }
}
