import { MenuItem } from '../models/menu.model';

// This code is defining a class Menu with a static property pages that is an array of MenuItem objects.
// Each MenuItem object represents a group of menu items with a common label, icon, and route.

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Dashboard',
      separator: true,
      type: 'Admin',
      items: [
        {
          icon: 'home',
          label: 'Dashboard',
          route: '/dashboard/admin-dashboard',
        },
      ],
    },

    // Admin
    {
      group: 'Management',
      separator: false,
      type: 'Admin',
      items: [
        {
          icon: 'bar_chart',
          label: 'Attendance and Schedule',
          children: [
            // { label: 'Faculty Management', route: '/faculty' },
            { label: 'Schedule Management', route: '/schedule' },
            { label: 'Attendance Monitoring', route: '/attendance' },
          ],
        },
        {
          icon: 'layers',
          label: 'Content Management',
          children: [
            { label: 'Semester Management', route: '/semester' },
            { label: 'Subject Management', route: '/subject' },
            { label: 'Room Management', route: '/room' },
          ],
        },
      ],
    },

    {
      group: 'CMS',
      separator: true,
      type: 'Admin',
      items: [
        {
          icon: 'vpn_key',
          label: 'Room Key Monitoring',
          route: '/room-key',
        },
        {
          icon: 'lab_profile',
          label: 'Reports',
          route: '/reports',
        },
        {
          icon: 'group',
          label: 'User Management',
          route: '/user',
        },
      ],
    },

    // Attendance Checker
    {
      group: 'Attendance Checker',
      separator: true,
      type: 'Attendance Checker', //change * to Attendance Checker to hide
      items: [
        {
          icon: 'home',
          label: 'Dashboard - AC',
          route: '/attendance-check/attendance-management',
        },
        {
          icon: 'bar_chart',
          label: 'Attendance Monitoring - AC',
          route: '/attendance-check/attendance-monitoring',
        },
        {
          icon: 'vpn_key',
          label: 'Keys - AC',
          route: '/keys/keys-overview',
        },
      ],
    },

    // Faculty
    {
      group: 'Faculty',
      separator: true,
      type: 'Faculty', //change * to Faculty to hide
      items: [
        {
          icon: 'home',
          label: 'Dashboard - F',
          route: '/dashboard/faculty-dashboard',
        },
        {
          icon: 'vpn_key',
          label: 'Keys - F',
          route: '/keys/faculty-keys',
        },
        {
          icon: 'event_available',
          label: 'Schedule - F',
          route: '/faculty-mode/faculty-schedule',
        },
        {
          icon: 'settings',
          label: 'Profile Settings - F',
          route: '/faculty-mode/faculty-profile',
        },
      ],
    },
  ];
}

// This class can be used in an Angular application to generate a menu dynamically based on the MenuItem objects defined
// in the Menu.pages array.
