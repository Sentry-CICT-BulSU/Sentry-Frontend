// Importing necessary modules from @angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, forkJoin, tap } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { SystemService } from 'src/app/core/services/system.service';
import Swal from 'sweetalert2';

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

  timeStart = time_start;
  timeEnd = time_end;

  faculty = new BehaviorSubject<any>(null);
  subject = new BehaviorSubject<any>(null);
  room = new BehaviorSubject<any>(null);
  section = new BehaviorSubject<any>(null);
  semester = new BehaviorSubject<any>(null);

  listLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    public systemService: SystemService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private scheduleService: ScheduleService,
    private router: Router
  ) {}

  initSystemColor() {
    const color = this.systemService.color;

    this.replaceClassName('bg-primary-', `bg-${color}-`);
    this.replaceClassName('text-primary-', `text-${color}-`);
    this.replaceClassName('border-primary-', `border-${color}-`);
    this.replaceClassName('ring-primary-', `ring-${color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${color}-`);
    this.replaceClassName('button-primary', `button-${color}`);
    this.replaceClassName('tab-link', `tab-link-${color}`);
    this.replaceClassName(
      'peer-checked:bg-primary-',
      `peer-checked:bg-${color}-`
    );
    this.replaceClassName(
      'peer-checked:border-primary-',
      `peer-checked:border-${color}-`
    );
    this.replaceClassName('focus:ring-primary-', `focus:ring-${color}-`);
  }

  private replaceClassName(prefix: string, replacement: string) {
    const elements = document.querySelectorAll(`[class*="${prefix}"]`);
    for (let i = 0; i < elements.length; i++) {
      const classList = elements[i].classList;
      for (let j = 0; j < classList.length; j++) {
        if (classList[j].startsWith(prefix)) {
          classList.replace(
            classList[j],
            classList[j].replace(prefix, replacement)
          );
        }
      }
    }
  }

  ngOnInit(): void {
    this.initSystemColor();
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
    const body = {
      adviser_id: this.newScheduleForm.value.faculty,
      room_id: this.newScheduleForm.value.room,
      subject_id: this.newScheduleForm.value.subject,
      section_id: this.newScheduleForm.value.section,
      semester_id: this.newScheduleForm.value.semester,
      time_start: this.newScheduleForm.value.time_start,
      time_end: this.newScheduleForm.value.time_end,
      active_days: Object.entries(
        this.newScheduleForm.controls['active_days'].value
      )
        .map(([v, b]) => (b ? v.toLowerCase() : false))
        .filter((v) => !!v),
    };
    console.log(this.newScheduleForm.value);
    console.log(body);
    this.scheduleService.addSchedule$(body).subscribe({
      next: (schedule) => {
        console.log(schedule);
        this.router.navigate(['/schedule']);

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Schedule added successfully!',
        });
      },
      error: (err) => console.debug(err),
    });
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

const time_start: { value: string; label: string }[] = [
  { value: '7:00 AM', label: '7:00 AM' },
  { value: '8:00 AM', label: '8:00 AM' },
  { value: '9:00 AM', label: '9:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 AM', label: '12:00 AM' },
  { value: '1:00 PM', label: '1:00 PM' },
  { value: '2:00 PM', label: '2:00 PM' },
  { value: '3:00 PM', label: '3:00 PM' },
  { value: '4:00 PM', label: '4:00 PM' },
  { value: '5:00 PM', label: '5:00 PM' },
  { value: '6:00 PM', label: '6:00 PM' },
];
const time_end: { value: string; label: string }[] = [
  { value: '7:00 AM', label: '7:00 AM' },
  { value: '8:00 AM', label: '8:00 AM' },
  { value: '9:00 AM', label: '9:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 AM', label: '12:00 AM' },
  { value: '1:00 PM', label: '1:00 PM' },
  { value: '2:00 PM', label: '2:00 PM' },
  { value: '3:00 PM', label: '3:00 PM' },
  { value: '4:00 PM', label: '4:00 PM' },
  { value: '5:00 PM', label: '5:00 PM' },
  { value: '6:00 PM', label: '6:00 PM' },
];
