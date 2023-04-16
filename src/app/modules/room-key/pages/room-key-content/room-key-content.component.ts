import {
    IRoomKeyLog,
    IRoomKeyLogCollection,
} from 'src/app/core/models';
import { RoomKeyLogsService } from './../../../../core/services/roomkey-logs.service';
// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
    selector: 'app-room-key-content',
    templateUrl: './room-key-content.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class RoomKeyContentComponent implements OnInit {
    roomKeyLogs?: IRoomKeyLog[];
    roomKeyLogCollection?: IRoomKeyLogCollection;
    availableKeys?: any;
    constructor(private roomKeyLogsService: RoomKeyLogsService) {}

    ngOnInit(): void {
        // comment below for frontend
        this.roomKeyLogsService.getRoomKeyLogs$().subscribe((roomKeyLogs) => {
            this.roomKeyLogCollection = roomKeyLogs;
            this.roomKeyLogs = roomKeyLogs.data as IRoomKeyLog[];
            console.log(roomKeyLogs);
        });
        this.roomKeyLogsService
            .getAvailableRoomKeys$()
            .subscribe((response) => (this.availableKeys = response));

        // uncomment below for frontend
        // this.roomKeyLogCollection = SAMPLE_DATA_LOGS;
        // this.roomKeyLogs = SAMPLE_DATA_LOGS.data as IRoomKeyLog[];
    }
}

const SAMPLE_DATA_LOGS: IRoomKeyLogCollection = {
    data: [
        {
            id: 12,
            room_key_id: 1,
            faculty_id: 6,
            status: 'Borrowed',
            created_at: '2023-04-10T09:57:29.000000Z',
            updated_at: '2023-04-10T09:57:29.000000Z',
            deleted_at: null,
            subject_id: 1,
            time_block: '2:00pm - 4:00pm',
            room_key: {
                id: 1,
                room_id: 1,
                status: 'In Use',
                created_at: '2023-04-03T05:09:31.000000Z',
                updated_at: '2023-04-03T06:57:29.000000Z',
                deleted_at: null,
                room: {
                    id: 1,
                    name: 'IT 1',
                    location: '3rd Floor - Pimentel Hall',
                    status: 'active',
                    created_at: '2023-04-01T06:09:40.000000Z',
                    updated_at: '2023-04-01T12:18:55.000000Z',
                    deleted_at: null,
                },
            },
            faculty: {
                id: 6,
                email: 'faculty32@test.com',
                email_verified_at: null,
                type: 'Faculty',
                created_at: '2023-03-29T22:10:59.000000Z',
                updated_at: '2023-03-29T22:10:59.000000Z',
                deleted_at: null,
                first_name: 'Vreiln',
                last_name: 'Faculty 3',
                position: 'Instructor III',
                college: 'College of Information and Communications Technology',
                contact: '09998887777',
                status: 'active',
                profile_img: null,
                full_name: 'Vreiln Faculty 3',
            },
            subject: {
                id: 1,
                section_id: 1,
                code: 'IT 301',
                title: 'Application Development and Emerging Technologies',
                status: 'active',
                created_at: '2023-03-30T13:43:08.000000Z',
                updated_at: '2023-03-30T13:56:07.000000Z',
                deleted_at: null,
            },
        },
        {
            id: 7,
            room_key_id: 1,
            faculty_id: 6,
            status: 'Returned',
            created_at: '2023-04-03T06:57:23.000000Z',
            updated_at: '2023-04-03T06:57:23.000000Z',
            deleted_at: null,
            subject_id: 1,
            time_block: '2:00pm - 4:00pm',
            room_key: {
                id: 1,
                room_id: 1,
                status: 'In Use',
                created_at: '2023-04-03T05:09:31.000000Z',
                updated_at: '2023-04-03T06:57:29.000000Z',
                deleted_at: null,
                room: {
                    id: 1,
                    name: 'IT 1',
                    location: '3rd Floor - Pimentel Hall',
                    status: 'active',
                    created_at: '2023-04-01T06:09:40.000000Z',
                    updated_at: '2023-04-01T12:18:55.000000Z',
                    deleted_at: null,
                },
            },
            faculty: {
                id: 6,
                email: 'faculty32@test.com',
                email_verified_at: null,
                type: 'Faculty',
                created_at: '2023-03-29T22:10:59.000000Z',
                updated_at: '2023-03-29T22:10:59.000000Z',
                deleted_at: null,
                first_name: 'Vreiln',
                last_name: 'Faculty 3',
                position: 'Instructor III',
                college: 'College of Information and Communications Technology',
                contact: '09998887777',
                status: 'active',
                profile_img: null,
                full_name: 'Vreiln Faculty 3',
            },
            subject: {
                id: 1,
                section_id: 1,
                code: 'IT 301',
                title: 'Application Development and Emerging Technologies',
                status: 'active',
                created_at: '2023-03-30T13:43:08.000000Z',
                updated_at: '2023-03-30T13:56:07.000000Z',
                deleted_at: null,
            },
        },
        {
            id: 6,
            room_key_id: 1,
            faculty_id: 6,
            status: 'Borrowed',
            created_at: '2023-04-03T06:57:14.000000Z',
            updated_at: '2023-04-03T06:57:14.000000Z',
            deleted_at: null,
            subject_id: 1,
            time_block: '2:00pm - 4:00pm',
            room_key: {
                id: 1,
                room_id: 1,
                status: 'In Use',
                created_at: '2023-04-03T05:09:31.000000Z',
                updated_at: '2023-04-03T06:57:29.000000Z',
                deleted_at: null,
                room: {
                    id: 1,
                    name: 'IT 1',
                    location: '3rd Floor - Pimentel Hall',
                    status: 'active',
                    created_at: '2023-04-01T06:09:40.000000Z',
                    updated_at: '2023-04-01T12:18:55.000000Z',
                    deleted_at: null,
                },
            },
            faculty: {
                id: 6,
                email: 'faculty32@test.com',
                email_verified_at: null,
                type: 'Faculty',
                created_at: '2023-03-29T22:10:59.000000Z',
                updated_at: '2023-03-29T22:10:59.000000Z',
                deleted_at: null,
                first_name: 'Vreiln',
                last_name: 'Faculty 3',
                position: 'Instructor III',
                college: 'College of Information and Communications Technology',
                contact: '09998887777',
                status: 'active',
                profile_img: null,
                full_name: 'Vreiln Faculty 3',
            },
            subject: {
                id: 1,
                section_id: 1,
                code: 'IT 301',
                title: 'Application Development and Emerging Technologies',
                status: 'active',
                created_at: '2023-03-30T13:43:08.000000Z',
                updated_at: '2023-03-30T13:56:07.000000Z',
                deleted_at: null,
            },
        },
        {
            id: 2,
            room_key_id: 1,
            faculty_id: 6,
            status: 'Borrowed',
            created_at: '2023-04-03T06:49:26.000000Z',
            updated_at: '2023-04-03T06:49:26.000000Z',
            deleted_at: null,
            subject_id: 1,
            time_block: '2:00pm - 4:00pm',
            room_key: {
                id: 1,
                room_id: 1,
                status: 'In Use',
                created_at: '2023-04-03T05:09:31.000000Z',
                updated_at: '2023-04-03T06:57:29.000000Z',
                deleted_at: null,
                room: {
                    id: 1,
                    name: 'IT 1',
                    location: '3rd Floor - Pimentel Hall',
                    status: 'active',
                    created_at: '2023-04-01T06:09:40.000000Z',
                    updated_at: '2023-04-01T12:18:55.000000Z',
                    deleted_at: null,
                },
            },
            faculty: {
                id: 6,
                email: 'faculty32@test.com',
                email_verified_at: null,
                type: 'Faculty',
                created_at: '2023-03-29T22:10:59.000000Z',
                updated_at: '2023-03-29T22:10:59.000000Z',
                deleted_at: null,
                first_name: 'Vreiln',
                last_name: 'Faculty 3',
                position: 'Instructor III',
                college: 'College of Information and Communications Technology',
                contact: '09998887777',
                status: 'active',
                profile_img: null,
                full_name: 'Vreiln Faculty 3',
            },
            subject: {
                id: 1,
                section_id: 1,
                code: 'IT 301',
                title: 'Application Development and Emerging Technologies',
                status: 'active',
                created_at: '2023-03-30T13:43:08.000000Z',
                updated_at: '2023-03-30T13:56:07.000000Z',
                deleted_at: null,
            },
        },
    ],
    links: {
        first: 'http://cict-sentry.test/api/admin/logs?page=1',
        last: 'http://cict-sentry.test/api/admin/logs?page=1',
        prev: null,
        next: null,
    },
    meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        links: [
            {
                url: null,
                label: '&laquo; Previous',
                active: false,
            },
            {
                url: 'http://cict-sentry.test/api/admin/logs?page=1',
                label: '1',
                active: true,
            },
            {
                url: null,
                label: 'Next &raquo;',
                active: false,
            },
        ],
        path: 'http://cict-sentry.test/api/admin/logs',
        per_page: 15,
        to: 4,
        total: 4,
    },
};
