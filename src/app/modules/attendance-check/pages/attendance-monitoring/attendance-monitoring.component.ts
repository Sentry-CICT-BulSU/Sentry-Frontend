import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, tap } from 'rxjs';
import { IAttendance, ISchedule } from 'src/app/core/models';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import Swal from 'sweetalert2';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-attendance-monitoring',
  templateUrl: './attendance-monitoring.component.html',
})
export class AttendanceMonitoringComponent implements OnInit {
  schedules?: ISchedule[];
  schedulesActive?: ISchedule[];
  schedulesInactive?: ISchedule[];
  constructor(
    private scheduleService: ScheduleService,
    private attendanceService: AttendanceService,
    private router: Router,
    public systemService: SystemService
  ) {}

  p = 1;

  ngOnInit(): void {
    this.initComponent();
    this.loadSchedules();
  }

  loadSchedules() {
    this.scheduleService
      .loadSchedules$()
      .pipe(
        tap((schedules) => {
          if (schedules.data) {
            this.schedules = (schedules.data as ISchedule[]).filter(
              (schedule) => {
                const timeString = schedule.time_start;
                const date = new Date();
                date.setHours(parseInt(timeString.split(':')[0]));
                date.setMinutes(
                  parseInt(timeString.split(':')[1].split(' ')[0])
                );
                date.setSeconds(0);
                return date.getTime() >= new Date().getTime();
              }
            );
            this.schedulesActive = (schedules.data as ISchedule[]).filter(
              (schedule) => schedule.time_start.includes('AM')
            );
            this.schedulesInactive = (schedules.data as ISchedule[]).filter(
              (schedule) => schedule.time_start.includes('PM')
            );
          }
        })
      )
      .subscribe({
        next: () => {
          console.log(
            this.schedules,
            this.schedulesActive,
            this.schedulesInactive
          );
        },
        error: (err) => console.debug(err),
      });
  }

  initComponent() {
    const tabLinks = document.querySelectorAll(
      '.tab-link'
    ) as NodeListOf<HTMLAnchorElement>;
    const tabContents = document.querySelectorAll(
      '.tab-content'
    ) as NodeListOf<HTMLElement>;

    tabLinks[0].classList.add('active1');
    tabContents[0].classList.add('active');

    tabLinks.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const selectedTab = link.hash;
        tabLinks.forEach((link) => {
          link.classList.remove('active1');
        });
        tabContents.forEach((content) => {
          content.classList.remove('active');
        });
        link.classList.add('active1');
        (document.querySelector(selectedTab) as HTMLElement).classList.add(
          'active'
        );
      });
    });
  }

  haveAttendance(schedule: ISchedule): boolean {
    if (!schedule.attendances) return false;
    return !!(schedule.attendances as IAttendance);
  }
  parseAttendance(schedule: ISchedule) {
    if (!schedule.attendances) return;
    return (schedule.attendances as IAttendance).status;
  }
  onMarkAsAbsent(schedule: ISchedule) {
    Swal.fire({
      title: 'Mark as Absent',
      text: 'Proceed to mark as absent: ' + schedule.adviser?.full_name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6941C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed!',
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          user_id: schedule.adviser?.id,
          status: 'absent',
        };
        this.attendanceService.addAttendance$(schedule.id, body).subscribe({
          next: (attendance) => {
            console.log(attendance);
            Swal.fire({
              title: 'Success!',
              text: schedule.adviser?.full_name + ' has been marked as absent.',
              icon: 'success',
              showConfirmButton: true,
            }).then(() => {
              // this.router.navigate(['/attendance-check/attendance-monitoring']);
              this.ngOnInit();
            });
          },
          error: (err) => console.debug(err),
        });
      }
    });
  }
}
