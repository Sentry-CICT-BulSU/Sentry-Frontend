import { MenuItem } from '../models/menu.model';

// This code is defining a class Menu with a static property pages that is an array of MenuItem objects.
// Each MenuItem object represents a group of menu items with a common label, icon, and route.

export class Menu {
  public static pages: MenuItem[] = [

    {
      group: 'Dashboard',
      separator: true,
      items: [
        // {
        //   icon: 'home',
        //   label: 'Dashboard',
        //   route: '/dashboard',
        // },

        //attendance checker side
        {
          icon: 'task',
          label: 'Attendance Management',
          route: '/attendance-check/attendance-management'
        },
        {
          icon: 'bar_chart',
          label: 'Attendance Monitoring',
          route: '/attendance-check/attendance-monitoring'
        }
      ],
    },

    {
      group: 'Drop Down',
      separator: false,
      items: [
        // {
        //   icon: 'bar_chart',
        //   label: 'Faculty and Schedule',
        //   route: '/faculty-and-schedule',
        //   children: [
        //       { label: 'Faculty Management', route: '/faculty' },
        //       { label: 'Schedule Management', route: '/schedule' },
        //       { label: 'Attendance Monitoring', route: '/attendance' },
        //   ],
        // },
        // {
        //   icon: 'layers',
        //   label: 'Content Management',
        //   route: '/cms',
        //   children: [
        //     { label: 'Semester Management', route: '/semester' },
        //     { label: 'Subject Management', route: '/subject' },
        //     { label: 'Room Management', route: '/room' },
        //   ],
        // },

        //attendance checker side
        {
          icon: 'vpn_key',
          label: 'Classroom Keys',
          route: '/clasroom_keys',
          children: [
            { label: 'Overview', route: '/keys/keys-overview' },
            { label: 'Keys', route: '/keys/classroom-keys' },
            { label: 'Key Logs', route: '/keys/key-logs' },
          ]
        }
      ],
    },

    {
      group: 'Plain',
      separator: true,
      items: [

        // {
        //   icon: 'vpn_key',
        //   label: 'Room Key Monitoring',
        //   route: '/room-key',
        // },
        // {
        //   icon: 'lab_profile',
        //   label: 'Reports',
        //   route: '/reports',
        // },
        // {
        //   icon: 'group',
        //   label: 'User Management',
        //   route: '/user',
        // },
        // {
        //   icon: 'bar_chart',
        //   label: 'Attendance Management - AC',
        //   route: '/attendance-check',
        // },
        // {
        //   icon: 'vpn_key',
        //   label: 'Keys - AC',
        //   route: '/keys',
        // },
      ],
    },
  ];
}

// This class can be used in an Angular application to generate a menu dynamically based on the MenuItem objects defined
// in the Menu.pages array.
