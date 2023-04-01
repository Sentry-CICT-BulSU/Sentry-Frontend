import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/core/models/menu.model';
import { ThemeService } from 'src/app/core/services/theme.service';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../services/menu.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/core/models/user.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})

// Defining the class for the Sidebar Component and implementing the OnInit Interface
export class SidebarComponent implements OnInit {
    // Defining two observable variables showSideBar$ and pagesMenu$.
    // These observables are used to store the state of the menu items and sidebar.

    public showSideBar$: Observable<boolean> = new Observable<boolean>();
    public pagesMenu$: Observable<MenuItem[]> = new Observable<MenuItem[]>();

    // Defining the appJson variable and initializing it with the package.json file.
    // This is used to store the application version number.

    public appJson = packageJson;
    user?: IUser;

    @Output() signOut: EventEmitter<boolean> = new EventEmitter<boolean>();

    // Initializing the constructor with the ThemeService and MenuService.

    constructor(
        public themeService: ThemeService,
        private menuService: MenuService,
        private authService: AuthService
    ) {
        // Subscribing to the showSideBar$ and pagesMenu$ observables and storing their state in the class variables.

        this.showSideBar$ = this.menuService.showSideBar$;
        this.pagesMenu$ = this.menuService.pagesMenu$;
    }

    ngOnInit(): void {
        this.authService.current_user_subject$?.subscribe(
            (user: IUser | undefined) => (this.user = user)
        );
    }

    // A method to toggle the sidebar on and off.

    public toggleSidebar() {
        this.menuService.toggleSidebar();
    }

    // A method to toggle between dark and light themes.

    toggleTheme() {
        this.themeService.theme = !this.themeService.isDark ? 'dark' : 'light';
    }

    onSignOut() {
        this.signOut.emit(true);
    }
}
