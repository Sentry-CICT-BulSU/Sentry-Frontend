import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/core/services/system.service';

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
    private activatedRoute: ActivatedRoute,
    public systemService: SystemService
  ) {}

  // A method to toggle a sub-menu item.

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  initSystemColor() {
    const color = this.systemService.color;

    this.replaceClassName('bg-primary-', `bg-${color}-`);
    this.replaceClassName('text-primary-', `text-${color}-`);
    this.replaceClassName('border-primary-', `border-${color}-`);
    this.replaceClassName('ring-primary-', `ring-${color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${color}-`);
  }

  private replaceClassName(prefix: string, replacement: string) {
    const elements = document.querySelectorAll(`[class*="${prefix}"]`);
    for (let i = 0; i < elements.length; i++) {
      const classList = elements[i].classList;
      for (let j = 0; j < classList.length; j++) {
        if (classList[j].startsWith(prefix)) {
          classList.replace(
            classList[j],
            classList[j].replace(prefix, replacement)
          );
        }
      }
    }
  }

  ngOnInit(): void {
    this.initSystemColor();
    // Subscribing to the showSideBar$ and pagesMenu$ observables and storing their state in the class variables.
    this.showSideBar$ = this.menuService.showSideBar$;
    this.pagesMenu$ = this.menuService.pagesMenu$;
  }
}
