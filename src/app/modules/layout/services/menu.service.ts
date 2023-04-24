import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Menu } from 'src/app/core/constants/menu';
import { IUser } from 'src/app/core/models';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class MenuService implements OnDestroy {
    private _showSidebar$ = new BehaviorSubject<boolean>(true);
    private _showMobileMenu$ = new BehaviorSubject<boolean>(false);
    public _pagesMenu$ = new BehaviorSubject<MenuItem[]>([]);
    private subscription = new Subscription();

    constructor(private router: Router, private authService: AuthService) {
        // injects the Router service
        /** Set dynamic menu */
        // this._pagesMenu$.next(Menu.pages);
        authService.current_user_subject$?.subscribe(
            (user: IUser | undefined) => {
                if (user) {
                    this._pagesMenu$.next(
                        Menu.pages.filter(
                            (e: MenuItem) =>
                                e.type === user.type || e.type === '*'
                        )
                    );

                    const sub = this.router.events.subscribe((event) => {
                        // creates a subscription to router events
                        if (event instanceof NavigationEnd) {
                            /** Expand menu base on active route */
                            this._pagesMenu$.forEach((menuItem) => {
                                // loops through the menu items
                                menuItem.forEach((menu) => {
                                    // loops through the sub-menu items
                                    let activeGroup = false;
                                    menu.items.forEach((subMenu) => {
                                        // loops through the sub-items
                                        const active = this.isActive(
                                            subMenu.route
                                        ); // checks if the sub-item's route is active
                                        subMenu.expanded = active; // sets the sub-item's 'expanded' property to the value of active
                                        subMenu.active = active; // sets the sub-item's 'active' property to the value of active
                                        if (active) activeGroup = true; // sets activeGroup to true if the sub-item is active
                                        if (subMenu.children) {
                                            this.expand(subMenu.children); // calls the expand() function recursively if there are children
                                        }
                                    });
                                    menu.active = activeGroup; // sets the menu's 'active' property to the value of activeGroup
                                });
                            });
                        }
                    });

                    this.subscription.add(sub); // adds the subscription to the subscription manager
                }
            }
        );
    }

    get showSideBar$() {
        // getter function for the _showSidebar$ BehaviorSubject
        return this._showSidebar$.asObservable();
    }
    get showMobileMenu$() {
        // getter function for the _showMobileMenu$ BehaviorSubject
        return this._showMobileMenu$.asObservable();
    }
    get pagesMenu$() {
        // getter function for the _pagesMenu$ BehaviorSubject
        return this._pagesMenu$.asObservable();
    }

    set showSideBar(value: boolean) {
        // setter function for the _showSidebar$ BehaviorSubject
        this._showSidebar$.next(value);
    }
    set showMobileMenu(value: boolean) {
        // setter function for the _showMobileMenu$ BehaviorSubject
        this._showMobileMenu$.next(value);
    }

    public toggleSidebar() {
        // function to toggle the sidebar
        this._showSidebar$.next(!this._showSidebar$.value); // negates the current value of the _showSidebar$ BehaviorSubject and sets it to the new value
    }

    public toggleMenu(menu: any) {
        // function to toggle the menu
        this.showSideBar = true;
        menu.expanded = !menu.expanded;
    }

    // The toggleSubMenu method takes in a SubMenuItem object and toggles the expanded property of that object. This method is used
    // to expand or collapse a submenu in the sidebar menu.

    public toggleSubMenu(submenu: SubMenuItem) {
        submenu.expanded = !submenu.expanded;
    }

    // The expand method takes in an array of items and recursively expands or collapses the expanded property of each item based on whether
    // the item's route matches the current active route.

    private expand(items: Array<any>) {
        items.forEach((item) => {
            item.expanded = this.isActive(item.route);
            if (item.children) this.expand(item.children);
        });
    }

    // The isActive method takes in an instruction and checks if the current route is active based on that instruction. It does this by using
    // the router.isActive method and passing in the instruction and options object.

    private isActive(instruction: any): boolean {
        return this.router.isActive(this.router.createUrlTree([instruction]), {
            paths: 'subset',
            queryParams: 'subset',
            fragment: 'ignored',
            matrixParams: 'ignored',
        });
    }

    // The ngOnDestroy method is a lifecycle hook in Angular that is called when the component is destroyed. In this case,
    // it unsubscribes from the subscription property to avoid memory leaks.

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
