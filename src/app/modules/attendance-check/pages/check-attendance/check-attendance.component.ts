import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { ISchedule } from 'src/app/core/models';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { environment as env } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-attendance',
  templateUrl: './check-attendance.component.html',
})
export class CheckAttendanceComponent implements OnInit {
  schedule?: ISchedule;
  markAsPresentForm?: FormGroup;
  file?: File;
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
      attachment: ['', []],
    });
  }

  loadSchedule() {
    this.route.params
      .pipe(
        switchMap((params) =>
          params['id'] && +params['id']
            ? this.scheduleService.loadSchedule$(+params['id'])
            : of(null)
        )
      )
      .subscribe({
        next: (schedule) => {
          if (schedule) {
            console.log(schedule);
            this.schedule = schedule.data as ISchedule;
            this.initComponent(this.schedule);
          }
        },
        error: (err) => console.debug(err),
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (!this.markAsPresentForm) return;
    if (!file) {
      return alert('No image selected');
    } else if (file.length > env.MAX_FILE_SIZE) {
      return alert(
        'File size is too large, max accepted file size is: ' +
          env.MAX_FILE_SIZE / 1000
      );
    }
    this.file = file;
    console.log(file);
    // const reader = new FileReader();
    // reader.onload = (e) => (this.profile_img = reader.result);
    // reader.readAsDataURL(file);
  }

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
    }).then((result) => {
      if (result.isConfirmed && this.markAsPresentForm && this.schedule) {
        const formData: FormData = new FormData();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.entries(this.markAsPresentForm.value).forEach(
          ([key, value]: any[]) => formData.append(key, value)
        );
        if (this.file && this.markAsPresentForm.contains('attachment')) {
          formData.set('attachment', this.file);
        }
        this.attendanceService
          .addAttendance$(this.schedule.id, formData)
          .subscribe({
            next: (attendance) => {
              console.log(attendance);
              this.router.navigate(['/attendance-check/attendance-monitoring']);
              Swal.fire(
                'Marked as Present!',
                'Faculty has been marked as present.',
                'success'
              );
            },
            error: (err) => console.debug(err),
          });
      }
    });
  }
}
