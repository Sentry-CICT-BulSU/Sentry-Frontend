// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';
import {
    IRoomKey,
    IRoomKeyCollection,
} from 'src/app/core/models/room-key.model';
import { ISchedule } from 'src/app/core/models/schedule.model';
import { RoomKeyService } from 'src/app/core/services/roomkey.service';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
    selector: 'app-room-key-content',
    templateUrl: './room-key-content.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class RoomKeyContentComponent implements OnInit {
    roomKeyCollection?: IRoomKeyCollection;
    roomKeys?: IRoomKey[];
    constructor(private roomKeySerivce: RoomKeyService) {}

    ngOnInit(): void {
        // comment below for frontend
        this.roomKeySerivce.getRoomKeys$().subscribe((roomKeys) => {
            this.roomKeyCollection = roomKeys as IRoomKeyCollection;
            this.roomKeys = this.roomKeyCollection.data as IRoomKey[];
            console.log(roomKeys);
        });

        // uncomment below for frontend
        // this.roomKeyCollection = SAMPLE_DATA;
        // this.roomKeys = SAMPLE_DATA.data as IRoomKey[];
    }
}

const SAMPLE_DATA: IRoomKeyCollection = {
    data: [
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
    ],
    links: {
        first: 'http://la-passport.test/api/admin/keys?page=1',
        last: 'http://la-passport.test/api/admin/keys?page=1',
        prev: null,
        next: null,
    },
    meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        links: [
            { url: null, label: '&laquo; Previous', active: false },
            {
                url: 'http://la-passport.test/api/admin/keys?page=1',
                label: '1',
                active: true,
            },
            { url: null, label: 'Next &raquo;', active: false },
        ],
        path: 'http://la-passport.test/api/admin/keys',
        per_page: 15,
        to: 1,
        total: 1,
    },
};
