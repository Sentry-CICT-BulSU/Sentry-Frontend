import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import {
  IAttendance,
  IAttendanceStatistics,
  ISchedule,
  IScheduleCollection,
} from 'src/app/core/models';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-attendance-management',
  templateUrl: './attendance-management.component.html',
})
export class AttendanceManagementComponent implements OnInit {
  schedules?: ISchedule[];
  schedulesCollection?: IScheduleCollection;
  attendancesStatistics?: IAttendanceStatistics;
  constructor(
    private attendanceService: AttendanceService,
    public systemService: SystemService
  ) {}
  ngOnInit(): void {
    this.initComponent();
    this.loadAttendances();
  }

  p = 1;

  loadAttendances() {
    forkJoin([
      this.attendanceService.loadAttendances$(),
      this.attendanceService.loadStatistics$(),
    ]).subscribe({
      next: ([schedules, statistics]) => {
        console.log(schedules, statistics);
        this.schedulesCollection = schedules as IScheduleCollection;
        this.schedules = schedules.data as ISchedule[];
        this.attendancesStatistics = statistics;
      },
      error: (err) => console.log(err),
    });
  }

  filterMonitoredAttendances(monitored: boolean) {
    if (!this.schedules) return;
    return this.schedules?.filter((schedule) => {
      if ((schedule.attendance as IAttendance) && monitored) {
        return true;
      } else if (!(schedule.attendance as IAttendance) && !monitored) {
        return true;
      }
      return false;
    });
  }
  checkAttendanceStatus(schedule: ISchedule, status: string): boolean {
    const attendance = schedule.attendance as IAttendance | null;
    if (!attendance && status === 'NaT') return true;
    if (attendance && attendance.status === 'present' && status === 'present')
      return true;
    else if (
      attendance &&
      attendance.status === 'absent' &&
      status === 'absent'
    )
      return true;
    else return false;
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
}
