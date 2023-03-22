// Importing necessary modules and services
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit {
  // Declaring an observable to hold the menu items
  public pagesMenu$: Observable<MenuItem[]> = new Observable<MenuItem[]>();

  // Declaring classes to show and hide menu
  private showMenuClass = ['scale-100', 'animate-fade-in-up', 'opacity-100', 'pointer-events-auto'];
  private hideMenuClass = ['scale-95', 'animate-fade-out-down', 'opacity-0', 'pointer-events-none'];

  constructor(private menuService: MenuService) {
    // Injecting the menu service and setting the menu items to the observable
    this.pagesMenu$ = this.menuService.pagesMenu$;
  }

  ngOnInit(): void {}

  // Method to toggle the menu
  public toggleMenu(menu: MenuItem): void {
    menu.selected = !menu.selected;
  }

  // Method to handle mouse enter event to show the menu
  public mouseEnter(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      // Removing hide classes and adding show classes to the element to show the menu
      this.hideMenuClass.forEach((c) => element.classList.remove(c));
      this.showMenuClass.forEach((c) => element.classList.add(c));
    }
  }

  // Method to handle mouse leave event to hide the menu
  public mouseLeave(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      // Removing show classes and adding hide classes to the element to hide the menu
      this.showMenuClass.forEach((c) => element.classList.remove(c));
      this.hideMenuClass.forEach((c) => element.classList.add(c));
    }
  }
}


/*public members are accessible from any part of the application, while private members can only be accessed within the same class.
In the code above, public is used to declare a public property pagesMenu$ that can be accessed and modified from other parts
of the application. On the other hand, private is used to declare two private properties showMenuClass and hideMenuClass that
can only be accessed within the same class.

Access modifiers are used to enforce encapsulation, which is a principle of object-oriented programming that promotes data hiding
and prevents direct access to an object's internal state. By using access modifiers, we can control the visibility and accessibility
of class members and prevent unwanted modifications and access from outside the class.*/
