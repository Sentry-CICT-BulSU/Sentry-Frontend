import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/models';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],

  // Setting the ChangeDetectionStrategy to OnPush, which means that the component will only be updated if its input values change.

  changeDetection: ChangeDetectionStrategy.OnPush,
})

// Defining the class for the SidebarMenu Component and implementing the OnInit Interface
export class SidebarMenuComponent implements OnInit {
  // Defining two observable variables showSideBar$ and pagesMenu$.
  // These observables are used to store the state of the menu items and sidebar.

  public pagesMenu$: Observable<MenuItem[]> = new Observable<MenuItem[]>();
  public showSideBar$: Observable<boolean> = new Observable<boolean>();

  // Initializing the constructor with the MenuService.

  constructor(
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute
  ) {}

  // A method to toggle a sub-menu item.

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  ngOnInit(): void {
    // Subscribing to the showSideBar$ and pagesMenu$ observables and storing their state in the class variables.
    this.showSideBar$ = this.menuService.showSideBar$;
    this.pagesMenu$ = this.menuService.pagesMenu$;
  }
}
