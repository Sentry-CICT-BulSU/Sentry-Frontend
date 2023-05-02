import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../services/menu.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser, MenuItem } from 'src/app/core/models';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// import { ColorService } from 'src/app/core/services/color.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

// Defining the class for the Sidebar Component and implementing the OnInit Interface
export class SidebarComponent implements OnInit {
  // public colorClass = '';
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
    // private colorService: ColorService,
    public themeService: ThemeService,
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute,
    public systemService: SystemService
  ) {
    // Subscribing to the showSideBar$ and pagesMenu$ observables and storing their state in the class variables.

    this.showSideBar$ = this.menuService.showSideBar$;
    this.pagesMenu$ = this.menuService.pagesMenu$;
  }

  ngOnInit(): void {
    // this.authService.current_user_subject$?.subscribe(
    //     (user: IUser | undefined) => (this.user = user)
    // );
    // comment below for frontend
    this.user = this.activatedRoute.snapshot.data['user'];

    // uncomment below for frontend
    // this.user = SAMPLE_USER;
    this.initSystemColor();
  }

  initSystemColor() {
    const color = this.systemService.color;
    console.log('system color: ', color);
    this.replaceClassName('bg-primary-', `bg-${this.systemService.color}-`);
    this.replaceClassName('text-primary-', `text-${this.systemService.color}-`);
    this.replaceClassName('border-primary-', `border-${this.systemService.color}-`);
    this.replaceClassName('ring-primary-', `ring-${this.systemService.color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${this.systemService.color}-`);
    this.replaceClassName('scrollbar-track-primary-', `scrollbar-track-${this.systemService.color}-`);
    this.replaceClassName('scrollbar-thumb-primary-', `scrollbar-thumb-${this.systemService.color}-`);
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

  // A method to toggle the sidebar on and off.

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  // A method to toggle between dark and light themes.

  toggleTheme() {
    this.themeService.theme = !this.themeService.isDark ? 'dark' : 'light';
  }

  onSignOut() {
    // Show confirmation dialog using Swiperalert2
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to sign out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'Cancel',
    }).then((result: { isConfirmed: any }) => {
      // If user confirms, emit signOut event
      if (result.isConfirmed) {
        console.log('Sign out confirmed');
        this.signOut.emit(true);
      }
    });
  }
}

const SAMPLE_USER: IUser = {
  id: 1,
  email: 'rhondytioco@gmail.com',
  email_verified_at: '2023-03-29T19:38:10.000000Z',
  type: 'Admin',
  created_at: '2023-03-29T19:38:10.000000Z',
  updated_at: '2023-04-01T11:59:05.000000Z',
  deleted_at: null,
  first_name: 'Rhon',
  last_name: 'Stratos',
  position: 'Instructor I',
  college: 'College of Information and Communications Technology',
  contact: '09660783023',
  status: 'active',
  profile_img: null,
  full_name: 'Rhon Stratos',
};
