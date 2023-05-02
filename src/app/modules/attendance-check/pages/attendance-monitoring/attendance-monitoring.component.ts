import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ISchedule, IScheduleCollection } from 'src/app/core/models';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance-monitoring',
  templateUrl: './attendance-monitoring.component.html',
})
export class AttendanceMonitoringComponent implements OnInit {
  schedulesCollection?: IScheduleCollection;
  schedules?: ISchedule[];
  schedulesActiveCollection?: IScheduleCollection;
  schedulesActive?: ISchedule[];
  schedulesInactiveCollection?: IScheduleCollection;
  schedulesInactive?: ISchedule[];
  constructor(
    private scheduleService: ScheduleService,
    private attendanceService: AttendanceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initComponent();
    this.loadSchedules();
  }

  loadSchedules() {
    forkJoin([
      this.scheduleService.loadSchedules$(),
      this.scheduleService.loadSchedules$({ q: 'am' }),
      this.scheduleService.loadSchedules$({ q: 'pm' }),
    ]).subscribe({
      next: ([schedules, active, inactive]) => {
        this.schedulesCollection = schedules;
        this.schedules = schedules.data as ISchedule[];
        this.schedulesActiveCollection = active;
        this.schedulesActive = active.data as ISchedule[];
        this.schedulesInactiveCollection = inactive;
        this.schedulesInactive = inactive.data as ISchedule[];
        console.log(schedules, active, inactive);
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

    tabLinks[0].classList.add('active');
    tabContents[0].classList.add('active');

    tabLinks.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const selectedTab = link.hash;
        tabLinks.forEach((link) => {
          link.classList.remove('active');
        });
        tabContents.forEach((content) => {
          content.classList.remove('active');
        });
        link.classList.add('active');
        (document.querySelector(selectedTab) as HTMLElement).classList.add(
          'active'
        );
      });
    });
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
