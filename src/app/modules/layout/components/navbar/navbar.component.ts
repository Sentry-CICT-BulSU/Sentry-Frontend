import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

// This line defines the NavbarComponent class, which implements the OnInit interface. export keyword makes this class available
// to other parts of the application.
export class NavbarComponent implements OnInit {
  // This is the constructor of the NavbarComponent class, which takes an instance of MenuService as a parameter. The private keyword
  // in the constructor parameter declaration creates a class property that is accessible only within the class.
  sysIcon?: string;
  constructor(
    private menuService: MenuService,
    private system: SystemService
  ) {}

  ngOnInit(): void {
    this.sysIcon = this.system.icon;
  }

  // This is a method that toggles the value of the showMobileMenu property of the MenuService instance, which is injected into the constructor
  // of this component. The public keyword makes this method accessible to other parts of the application.

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
