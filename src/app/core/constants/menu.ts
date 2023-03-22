import { MenuItem } from '../models/menu.model';

// This code is defining a class Menu with a static property pages that is an array of MenuItem objects.
// Each MenuItem object represents a group of menu items with a common label, icon, and route.

export class Menu {
  public static pages: MenuItem[] = [

    {
      group: 'Menu',
      separator: true,
      items: [
        {
          icon: 'fa-solid fa-house',
          label: 'Dashboard',
          route: '/dashboard',
        },
        {
          icon: 'fa-solid fa-file',
          label: 'Report',
          route: '/report',
        },
        {
          icon: 'fa-solid fa-users',
          label: 'Users',
          route: '/users',
        },
        {
          icon: 'fa-solid fa-cog',
          label: 'Settings',
          route: '/settings',
        },
      ],
    },

  ];
}

// This class can be used in an Angular application to generate a menu dynamically based on the MenuItem objects defined
// in the Menu.pages array.
