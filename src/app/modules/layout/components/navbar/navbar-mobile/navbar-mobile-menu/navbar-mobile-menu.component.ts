import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from 'src/app/modules/layout/services/menu.service';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/models';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-navbar-mobile-menu',
  templateUrl: './navbar-mobile-menu.component.html',
  styleUrls: ['./navbar-mobile-menu.component.scss'],
})
export class NavbarMobileMenuComponent implements OnInit {
  public pagesMenu$: Observable<MenuItem[]> = new Observable<MenuItem[]>();
  public showSideBar$: Observable<boolean> = new Observable<boolean>();
  user?: IUser;
  apiLogItem: SubMenuItem = {
    icon: 'bug_report',
    label: 'API Debug Logs',
    route: env.apiRootRoute + '/telescope',
  };

  constructor(
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute
  ) {}

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  public closeMenu() {
    this.menuService.showMobileMenu = false;
  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['user'];
    this.showSideBar$ = this.menuService.showSideBar$;
    this.pagesMenu$ = this.menuService.pagesMenu$;
  }

  apiLogs() {
    // window.location.href = this.apiLogItem.route as string;
    window.open(this.apiLogItem.route as string, '_blank');
  }
}
