import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import {
  IAttendance,
  IAttendanceStatistics,
  ISchedule,
} from 'src/app/core/models';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  attendancesStatistics?: IAttendanceStatistics;
  attendances?: IAttendance[];
  schedules?: ISchedule[];
  constructor(
    public systemService: SystemService,
    private attendanceService: AttendanceService
  ) {}

  initSystemColor() {
    const color = this.systemService.color;

    this.replaceClassName('md:bg-primary-', `md:bg-${color}-`);
    this.replaceClassName('text-primary-', `text-${color}-`);
    this.replaceClassName('border-primary-', `border-${color}-`);
    this.replaceClassName('ring-primary-', `ring-${color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${color}-`);
    this.replaceClassName(
      'peer-checked:bg-primary-',
      `peer-checked:bg-${color}-`
    );
    this.replaceClassName(
      'peer-checked:border-primary-',
      `peer-checked:border-${color}-`
    );
  }

  getStatusClass(status: string): string {
    if (status === 'present') {
      return 'bg-green-500/25 text-green-500';
    } else {
      return 'bg-gray-300/25 text-gray-500 dark:text-gray-300';
    }
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
    this.loadAttendance();
  }

  loadAttendance() {
    forkJoin([
      this.attendanceService.loadAttendances$(),
      this.attendanceService.loadStatistics$(),
    ]).subscribe(([schedules, stats]) => {
      console.log(schedules, stats);
      this.attendancesStatistics = stats;
      this.schedules = schedules.data as ISchedule[];
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

  parseAttendance(schedule: ISchedule) {
    if (!schedule.attendance) return null;
    return (schedule.attendance as IAttendance).status;
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
}
