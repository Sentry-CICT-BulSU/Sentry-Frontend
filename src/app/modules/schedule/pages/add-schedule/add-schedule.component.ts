// Importing necessary modules from @angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, forkJoin, tap } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { SystemService } from 'src/app/core/services/system.service';

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
    console.log('system color: ', color);
    this.replaceClassName('bg-primary-', `bg-${this.systemService.color}-`);
    this.replaceClassName('text-primary-', `text-${this.systemService.color}-`);
    this.replaceClassName(
      'border-primary-',
      `border-${this.systemService.color}-`
    );
    this.replaceClassName('ring-primary-', `ring-${this.systemService.color}-`);
    this.replaceClassName(
      'hover:bg-primary-',
      `hover:bg-${this.systemService.color}-`
    );
    this.replaceClassName(
      'button-primary',
      `button-${this.systemService.color}`
    );
    this.replaceClassName('tab-link', `tab-link-${this.systemService.color}`);
    this.replaceClassName(
      'peer-checked:bg-primary-',
      `peer-checked:bg-${this.systemService.color}-`
    );
    this.replaceClassName(
      'peer-checked:border-primary-',
      `peer-checked:border-${this.systemService.color}-`
    );
    this.replaceClassName(
      'focus:ring-primary-',
      `focus:ring-${this.systemService.color}-`
    );
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
      ).map(([v, b]) => (b ? v.toLowerCase() : false)),
    };
    console.log(this.newScheduleForm.value);
    console.log(body);
    this.scheduleService.addSchedule$(body).subscribe({
      next: (schedule) => {
        console.log(schedule);
        this.router.navigate(['/schedule']);
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
];
const time_end: { value: string; label: string }[] = [
  { value: '6:00 PM', label: '6:00 PM' },
];
