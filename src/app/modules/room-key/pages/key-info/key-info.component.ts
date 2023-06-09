// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, forkJoin, tap } from 'rxjs';
import { IUser, IRoomKey, ISchedule, IRoomKeyLog } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin.service';
import { RoomKeyService } from 'src/app/core/services/roomkey.service';
import Swal from 'sweetalert2';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
  selector: 'app-key-info',
  templateUrl: './key-info.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class KeyInfoComponent implements OnInit {
  roomKeyId?: number;
  roomKey?: IRoomKey;
  logs?: IRoomKeyLog[];
  schedules?: ISchedule[];
  facultyToBorrow?: IUser;
  roomKeyForm?: FormGroup;
  formIsNull = false;
  faculty = new BehaviorSubject<any>(null);
  subject = new BehaviorSubject<any>(null);
  constructor(
    private route: ActivatedRoute,
    private roomKeyService: RoomKeyService,
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      if (data['id']) {
        this.roomKeyId = +data['id'];
        this.initForm();
        this.loadSubs();
      }
    });
  }
  initLists() {
    forkJoin({
      faculty: this.adminService.getLists$('faculty'),
      subject: this.adminService.getLists$('subject'),
    })
      .pipe(
        tap((resp) => {
          this.faculty.next(resp.faculty);
          this.subject.next(resp.subject);
          console.log(resp);
        })
      )
      .subscribe();
  }

  getStatusClass(status: string): string {
    if (status === 'Returned') {
      return 'bg-green-500/25 text-green-500';
    } else if (status === 'Borrowed') {
      return 'bg-blue-300/25 text-blue-500 dark:text-blue-300';
    } else {
      return 'bg-gray-300/25 text-gray-500 dark:text-gray-300';
    }
  }

  loadSubs() {
    if (this.roomKeyId) {
      console.log('load subs: ', this.roomKeyId);
      this.roomKeyService.getRoomKey$(this.roomKeyId).subscribe({
        next: (roomKey) => {
          if (roomKey) {
            console.log('getroomKey: ', roomKey);
            this.roomKey = roomKey.data as IRoomKey;
            this.logs = this.roomKey.logs as IRoomKeyLog[];
            this.schedules = this.roomKey.schedules as ISchedule[];
            this.facultyToBorrow =
              this.schedules.length > 0
                ? (this.schedules[0].adviser as IUser)
                : undefined;
            this.loadFormControls();
          }
        },
        error: (err) => console.log(err),
      });
    }
  }
  initForm() {
    this.roomKeyForm = this.fb.group({
      room_key_id: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      faculty_id: ['', [Validators.required]],
      time: ['', [Validators.required]],
      subject_id: ['', [Validators.required]],
      subject_code: ['', [Validators.required]],
      subject_name: ['', [Validators.required]],
    });
  }
  loadFormControls() {
    console.log('oadFormControls');
    const sched: ISchedule = (this.schedules as ISchedule[])[0] as ISchedule;
    const user: IUser = this.facultyToBorrow as IUser;
    const roomKey: IRoomKey = this.roomKey as IRoomKey;
    const log: IRoomKeyLog = (this.logs as IRoomKeyLog[])[0] as IRoomKeyLog;
    let roomKeyForm;

    console.log(this.facultyToBorrow, this.schedules);
    if (
      roomKey.status === 'Available' &&
      this.facultyToBorrow &&
      this.schedules &&
      this.schedules.length > 0
    ) {
      roomKeyForm = {
        id: this.roomKeyId,
        user_id: user?.id,
        subject_id: sched.subject?.id,
        faculty: user?.full_name,
        subject_code: sched.subject?.code,
        subject_name: sched.subject?.title,
        time: sched.time_start + ' - ' + sched.time_end,
      };
      this.patchForm(roomKeyForm);
    } else if (this.logs && this.logs.length > 0) {
      roomKeyForm = {
        id: log.room_key?.id,
        user_id: log.faculty?.id,
        subject_id: log.subject?.id,
        faculty: log.faculty?.full_name,
        subject_code: log.subject?.code,
        subject_name: log.subject?.title,
        time: log.time_block,
      };
      this.patchForm(roomKeyForm);
    } else {
      roomKeyForm = { id: this.roomKeyId };
      this.patchForm(roomKeyForm);
      alert('No active schedule found!');
      this.formIsNull = true;
      this.initLists();
      this.removeValidators();
    }
  }
  removeValidators() {
    if (this.roomKeyForm) {
      this.roomKeyForm.controls['room_key_id'].clearValidators();
      this.roomKeyForm.controls['faculty_id'].clearValidators();
      this.roomKeyForm.controls['subject_id'].clearValidators();
      this.roomKeyForm.addControl(
        'is_null',
        this.fb.control(true, [Validators.required])
      );
      console.log(this.roomKeyForm.controls);
      console.log(this.roomKeyForm.value);
    }
  }
  patchForm(roomKeyForm: any) {
    this.roomKeyForm?.controls['room_key_id'].setValue(roomKeyForm.id);
    this.roomKeyForm?.controls['faculty_id'].setValue(roomKeyForm.user_id);
    this.roomKeyForm?.controls['subject_id'].setValue(roomKeyForm.subject_id);
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

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Key borrowed successfully!',
    });
  }
  returnRoomKey() {
    if (!this.roomKeyId) return;
    this.roomKeyService
      .returnRoomKey$(this.roomKeyId)
      .subscribe(this.handleSubs);

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Key returned successfully!',
    });
  }
  lostRoomKey() {
    if (!this.roomKeyId) return;
    this.roomKeyService.lostRoomKey$(this.roomKeyId).subscribe(this.handleSubs);

    Swal.fire({
      icon: 'success',
      title: 'Warning',
      text: 'Key is marked lost!',
    });
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
