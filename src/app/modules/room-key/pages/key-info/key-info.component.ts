// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    IUser,
    IRoomKey,
    ISchedule,
    IRoomKeyCollection,
    IRoomKeyLog,
} from 'src/app/core/models';
import { RoomKeyService } from 'src/app/core/services/roomkey.service';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
    selector: 'app-key-info',
    templateUrl: './key-info.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class KeyInfoComponent implements OnInit {
    roomKeyId: number = this.route.snapshot.params['id'];
    roomKey?: IRoomKey;
    logs?: IRoomKeyLog[];
    schedules?: ISchedule[];
    facultyToBorrow?: IUser;
    roomKeyForm?: FormGroup;
    constructor(
        private route: ActivatedRoute,
        private roomKeyService: RoomKeyService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.roomKeyForm = this.fb.group({
            room_key_id: ['', [Validators.required]],
            faculty: ['', [Validators.required]],
            faculty_id: ['', [Validators.required]],
            time: ['', [Validators.required]],
            subject_id: ['', [Validators.required]],
            subject_code: ['', [Validators.required]],
            subject_name: ['', [Validators.required]],
        });

        // comment below for frontend
        this.loadSubs();
        // ---------------------------------------------------------------------

        // uncomment below for frontend
        // this.roomKey = SAMPLE_DATA.data as IRoomKey;
        // this.logs = this.roomKey.logs as IRoomKeyLog[];
        // this.schedules = this.roomKey.schedules as ISchedule[];
        // this.facultyToBorrow = this.schedules[0].adviser as IUser;
    }

    loadSubs() {
        return this.roomKeyService
            .getRoomKey$(this.roomKeyId)
            .subscribe((roomKey) => {
                if (
                    (roomKey.data as IRoomKey) &&
                    (roomKey.data as IRoomKey).logs &&
                    ((roomKey.data as IRoomKey).schedules as ISchedule[])
                        .length > 0
                ) {
                    this.roomKey = roomKey.data as IRoomKey;
                    this.logs = this.roomKey.logs as IRoomKeyLog[];
                    this.schedules = this.roomKey.schedules as ISchedule[];
                    this.facultyToBorrow =
                        this.schedules.length > 0
                            ? (this.schedules[0].adviser as IUser)
                            : undefined;
                    this.loadFormControls();
                }
            });
    }
    loadFormControls() {
        const sched: ISchedule = (
            this.schedules as ISchedule[]
        )[0] as ISchedule;
        const user: IUser = this.facultyToBorrow as IUser;
        const roomKey: IRoomKey = this.roomKey as IRoomKey;
        const log: IRoomKeyLog = (this.logs as IRoomKeyLog[])[0] as IRoomKeyLog;
        let roomKeyForm;
        if (roomKey.status === 'Available') {
            roomKeyForm = {
                id: roomKey.id,
                user_id: user.id,
                subject_id: sched.subject?.id,
                faculty: user.full_name,
                subject_code: sched.subject?.code,
                subject_name: sched.subject?.title,
                time: sched.time_start + ' - ' + sched.time_end,
            };
        } else {
            roomKeyForm = {
                id: log.room_key?.id,
                user_id: log.faculty?.id,
                subject_id: log.subject?.id,
                faculty: log.faculty?.full_name,
                subject_code: log.subject?.code,
                subject_name: log.subject?.title,
                time: log.time_block,
            };
        }
        this.roomKeyForm?.controls['room_key_id'].setValue(roomKeyForm.id);
        this.roomKeyForm?.controls['faculty_id'].setValue(roomKeyForm.user_id);
        this.roomKeyForm?.controls['subject_id'].setValue(
            roomKeyForm.subject_id
        );
        this.roomKeyForm?.controls['faculty'].setValue(roomKeyForm.faculty);
        this.roomKeyForm?.controls['subject_code'].setValue(
            roomKeyForm.subject_code
        );
        this.roomKeyForm?.controls['subject_name'].setValue(
            roomKeyForm.subject_name
        );
        this.roomKeyForm?.controls['time'].setValue(roomKeyForm.time);
    }

    loadFromSchedule(): void {
        this.loadSubs();
    }

    borrowRoomKey(): void {
        this.roomKeyService
            .borrowRoomKey$(this.roomKeyForm?.value)
            .subscribe(this.handleSubs);
    }
    returnRoomKey() {
        this.roomKeyService
            .returnRoomKey$(this.roomKeyId)
            .subscribe(this.handleSubs);
    }
    lostRoomKey() {
        this.roomKeyService
            .lostRoomKey$(this.roomKeyId)
            .subscribe(this.handleSubs);
    }

    get handleSubs() {
        return {
            next: (resp: unknown) => {
                console.log(resp);
                this.router.navigate(['/room-key']);
            },
            error: (err: unknown) => console.debug(err),
        };
    }
}

const SAMPLE_DATA: IRoomKeyCollection = {
    data: {
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

        schedules: [
            {
                id: 2,
                adviser_id: 6,
                subject_id: 1,
                semester_id: 28,
                room_id: 1,
                section_id: 1,
                date_start: '2022-12-18T16:00:00.000Z',
                date_end: '2023-2-18T16:00:00.000Z',
                time_start: '2:00pm',
                time_end: '4:00pm',
                active_days: [
                    'monday',
                    'tuesday',
                    'wednesday',
                    'thursday',
                    'friday',
                    'saturday',
                    'sunday',
                ],
                created_at: '2023-04-03T05:13:48.000000Z',
                updated_at: '2023-04-03T05:13:48.000000Z',
                deleted_at: null,
                laravel_through_key: 1,
                section: {
                    id: 1,
                    semester_id: 28,
                    adviser_id: 4,
                    name: 'BSIT 4K',
                    status: 'Active',
                    created_at: '2023-03-30T10:29:13.000000Z',
                    updated_at: '2023-03-30T10:32:15.000000Z',
                    deleted_at: null,
                },
                adviser: {
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
                    college:
                        'College of Information and Communications Technology',
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
                semester: {
                    id: 28,
                    name: '1st Semester',
                    academic_year: '2022-2023',
                    status: 'Active',
                    duration: {
                        start: '2000-12-19T08:00:00.000000Z',
                        end: '2000-12-29T08:00:00.000000Z',
                    },
                    created_at: '2023-03-30T09:33:35.000000Z',
                    updated_at: '2023-03-30T09:34:34.000000Z',
                    deleted_at: null,
                },
            },
        ],
        logs: [
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
                    college:
                        'College of Information and Communications Technology',
                    contact: '09998887777',
                    status: 'active',
                    profile_img: null,
                    full_name: 'Vreiln Faculty 3',
                },
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
                    college:
                        'College of Information and Communications Technology',
                    contact: '09998887777',
                    status: 'active',
                    profile_img: null,
                    full_name: 'Vreiln Faculty 3',
                },
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
                    college:
                        'College of Information and Communications Technology',
                    contact: '09998887777',
                    status: 'active',
                    profile_img: null,
                    full_name: 'Vreiln Faculty 3',
                },
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
                    college:
                        'College of Information and Communications Technology',
                    contact: '09998887777',
                    status: 'active',
                    profile_img: null,
                    full_name: 'Vreiln Faculty 3',
                },
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
    },
};
