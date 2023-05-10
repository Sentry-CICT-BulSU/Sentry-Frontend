import { Component, Input, OnInit, } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { SystemService } from 'src/app/core/services/system.service';
import Swal from 'sweetalert2';

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
      }
    });
  }
}
