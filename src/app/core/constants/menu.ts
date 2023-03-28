import { MenuItem } from '../models/menu.model';

// This code is defining a class Menu with a static property pages that is an array of MenuItem objects.
// Each MenuItem object represents a group of menu items with a common label, icon, and route.

export class Menu {
  public static pages: MenuItem[] = [

    {
        group: 'Dashboard',
        separator: true,
        items: [
          {
            icon: 'fa-solid fa-house',
            label: 'Dashboard',
            route: '/dashboard',
          },

        ],
      },

    {
        group: 'Drop Down',
        separator: false,
        items: [
          {
            icon: 'fa-solid fa-chart-simple',
            label: 'Faculty and Schedule',
            route: '/schedule',
            children: [
                { label: 'Faculty Management', route: '/faculty' },
                { label: 'Schedule Management', route: '/schedule' },
                { label: 'Attendance Monitoring', route: '/attendance' },
            ],
          },
          {
            icon: 'fa-solid fa-layer-group',
            label: 'Content Management',
            route: '/cms',
            children: [
              { label: 'Semester Management', route: '/semester' },
              { label: 'Subject Management', route: '/subject' },
              { label: 'Room Management', route: '/room' },
            ],
          },
        ],
      },

    {
      group: 'Plain',
      separator: true,
      items: [

        {
          icon: 'fa-solid fa-key',
          label: 'Room Key Monitoring',
          route: '/key',
        },
        {
            icon: 'fa-solid fa-file',
            label: 'Reports',
            route: '/report',
          },
        {
          icon: 'fa-solid fa-users',
          label: 'User Management',
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
