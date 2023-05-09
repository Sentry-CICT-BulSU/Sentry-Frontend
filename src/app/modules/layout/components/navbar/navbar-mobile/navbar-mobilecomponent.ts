import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss'],
})
export class NavbarMobileComponent implements OnInit {
  public showMobileMenu$: Observable<boolean> = new Observable<boolean>();
  sysIcon?: string;
  sysName?: string;
  constructor(private menuService: MenuService, private system: SystemService) {
    this.showMobileMenu$ = this.menuService.showMobileMenu$;
  }

  ngOnInit(): void {
    this.sysName = this.system.name;
    this.sysIcon = this.system.icon;
  }

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }
}
