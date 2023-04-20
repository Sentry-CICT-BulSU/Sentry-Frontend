import { MenuItem } from '../models/menu.model';

// This code is defining a class Menu with a static property pages that is an array of MenuItem objects.
// Each MenuItem object represents a group of menu items with a common label, icon, and route.

export class Menu {
    public static pages: MenuItem[] = [
        {
            group: 'Dashboard',
            separator: true,
            type: '*',
            items: [
                {
                    icon: 'home',
                    label: 'Dashboard',
                    route: '/dashboard',
                },
            ],
        },

        // Admin
        {
            group: 'Drop Down',
            separator: false,
            type: 'Admin',
            items: [
                {
                    icon: 'bar_chart',
                    label: 'Faculty and Schedule',
                    children: [
                        { label: 'Faculty Management', route: '/faculty' },
                        { label: 'Schedule Management', route: '/schedule' },
                        {
                            label: 'Attendance Monitoring',
                            route: '/attendance',
                        },
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
        // Attendance Checker
        {
            group: 'Drop Down',
            separator: false,
            type: 'Attendance Checker',
            items: [
                {
                    icon: 'bar_chart',
                    label: 'Faculty and Schedule 2 ',
                    children: [
                        { label: 'Faculty Management', route: '/faculty' },
                        { label: 'Schedule Management', route: '/schedule' },
                        {
                            label: 'Attendance Monitoring',
                            route: '/attendance',
                        },
                    ],
                },
                {
                    icon: 'layers',
                    label: 'Content Management 2',
                    children: [
                        { label: 'Semester Management', route: '/semester' },
                        { label: 'Subject Management', route: '/subject' },
                        { label: 'Room Management', route: '/room' },
                    ],
                },
            ],
        },
        // Faculty
        {
            group: 'Drop Down',
            separator: false,
            type: 'Faculty',
            items: [
                {
                    icon: 'bar_chart',
                    label: 'Faculty and Schedule',
                    children: [
                        { label: 'Faculty Management', route: '/faculty' },
                        { label: 'Schedule Management', route: '/schedule' },
                        {
                            label: 'Attendance Monitoring',
                            route: '/attendance',
                        },
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
            group: 'Plain',
            separator: true,
            type: '*',
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
    ];
}

// This class can be used in an Angular application to generate a menu dynamically based on the MenuItem objects defined
// in the Menu.pages array.
