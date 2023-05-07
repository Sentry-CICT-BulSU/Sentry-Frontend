import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISchedule, IUser } from 'src/app/core/models';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-attendance',
  templateUrl: './check-attendance.component.html',
})
export class CheckAttendanceComponent implements OnInit {
  schedule?: ISchedule;
  markAsPresentForm?: FormGroup;
  constructor(
    private router: Router,
    private attendanceService: AttendanceService,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadSchedule();
  }

  initComponent(schedule: ISchedule) {
    if (!schedule.adviser_id)
      this.router.navigate(['/attendance-check/attendance-monitoring']);

    this.markAsPresentForm = this.fb.group({
      user_id: [schedule.adviser_id, [Validators.required]],
      status: ['present', [Validators.required]],
      remarks: ['', []],
      // attachment: ['',[]],
    });
  }

  loadSchedule() {
    this.route.params.subscribe((params) => {
      if (!params['id'] && +params['id']) return;
      this.scheduleService.loadSchedule$(+params['id']).subscribe({
        next: (schedule) => {
          console.log(schedule);
          this.schedule = schedule.data as ISchedule;
          this.initComponent(this.schedule);
        },
        error: (err) => console.debug(err),
      });
    });
  }

  // onSubmit() {
  //   if (!this.schedule) return;
  //   if (!this.markAsPresentForm) return;
  //   this.attendanceService
  //     .addAttendance$(this.schedule.id, this.markAsPresentForm.value)
  //     .subscribe({
  //       next: (attendance) => {
  //         console.log(attendance);
  //         this.router.navigate(['/attendance-check/attendance-monitoring']);
  //       },
  //       error: (err) => console.debug(err),
  //     });
  // }

   onSubmit() {
    if (!this.schedule) return;
    if (!this.markAsPresentForm) return;

    Swal.fire({
      title: 'Confirm Present',
      text: 'Are you sure that this faculty is present?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6941C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, present!',
    })

    this.attendanceService
      .addAttendance$(this.schedule.id, this.markAsPresentForm.value)
      .subscribe({
        next: (attendance) => {
          console.log(attendance);
          this.router.navigate(['/attendance-check/attendance-monitoring']);
          Swal.fire('Marked as Present!', 'Faculty has been marked as present.', 'success');
        },
        error: (err) => console.debug(err),
      });

  }



}
