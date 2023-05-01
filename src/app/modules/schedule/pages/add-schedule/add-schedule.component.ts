// Importing necessary modules from @angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, forkJoin, tap } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class AddScheduleComponent implements OnInit, OnDestroy {
  newScheduleForm?: FormGroup;
  days = days;
  defaultDays = defaultDays;

  faculty = new BehaviorSubject<any>(null);
  subject = new BehaviorSubject<any>(null);
  room = new BehaviorSubject<any>(null);
  section = new BehaviorSubject<any>(null);
  semester = new BehaviorSubject<any>(null);

  listLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.initComponent();
    this.initLists();
  }

  ngOnDestroy(): void {
    this.listLoaded.unsubscribe();
  }

  initLists() {
    forkJoin({
      faculty: this.adminService.getLists$('faculty'),
      subject: this.adminService.getLists$('subject'),
      room: this.adminService.getLists$('room'),
      section: this.adminService.getLists$('section'),
      semester: this.adminService.getLists$('semester'),
    })
      .pipe(
        tap((resp) => {
          this.faculty.next(resp.faculty);
          this.subject.next(resp.subject);
          this.room.next(resp.room);
          this.section.next(resp.section);
          this.semester.next(resp.semester);
          console.log(resp);
        })
      )
      .subscribe();
  }
  initComponent() {
    this.newScheduleForm = this.fb.group({
      faculty: ['', [Validators.required]],
      room: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      section: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      schedule: ['', [Validators.required]],
      time_start: ['', [Validators.required]],
      time_end: ['', [Validators.required]],
      active_days: this.fb.group({
        Sunday: [false],
        Monday: [false],
        Tuesday: [false],
        Wednesday: [false],
        Thursday: [false],
        Friday: [false],
        Saturday: [false],
      }),
    });
    console.log(this.newScheduleForm.controls);
  }
  get activeDaysArray() {
    if (!this.newScheduleForm) return [];
    return Object.keys(
      (this.newScheduleForm.controls['active_days'] as FormGroup).controls
    );
  }
  onSubmit() {
    if (!this.newScheduleForm) return;
    console.log(this.newScheduleForm.value);
  }
}

const days = [
  { key: 'Sun', day: 'Sunday' },
  { key: 'Mon', day: 'Monday' },
  { key: 'Tue', day: 'Tuesday' },
  { key: 'Wed', day: 'Wednesday' },
  { key: 'Thu', day: 'Thursday' },
  { key: 'Fri', day: 'Friday' },
  { key: 'Sat', day: 'Saturday' },
];
const defaultDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
