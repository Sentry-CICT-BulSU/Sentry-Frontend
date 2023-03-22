import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-sidebar-submenu',
  templateUrl: './sidebar-submenu.component.html',
  styleUrls: ['./sidebar-submenu.component.scss'],
})

// Exporting the SidebarSubmenuComponent class and defining its submenu input property of type SubMenuItem and showSideBar$
// observable property of type Observable<boolean>. It also creates a constructor with MenuService dependency injection and
// sets showSideBar$ to the value of menuService.showSideBar$.

export class SidebarSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem>{};
  public showSideBar$: Observable<boolean> = new Observable<boolean>();

  constructor(private menuService: MenuService) {
    this.showSideBar$ = this.menuService.showSideBar$;
  }

  ngOnInit(): void {}

  //A method to toggle the submenu.

  public toggleMenu(menu: any) {
    this.menuService.toggleSubMenu(menu);
  }

  // A private method collapse that takes an array of items, iterates through them, and sets the expanded property of each item to false.
  // If the item has children, the collapse method is called recursively on its children.

  private collapse(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = false;
      if (item.children) this.collapse(item.children);
    });
  }
}
