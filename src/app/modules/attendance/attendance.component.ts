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
    private attendanceService: AttendanceService,
    private scheduleService: ScheduleService
  ) {}

  initSystemColor() {
    const color = this.systemService.color;
    console.log('system color: ', color);
    this.replaceClassName(
      'md:bg-primary-',
      `md:bg-${this.systemService.color}-`
    );
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
      'peer-checked:bg-primary-',
      `peer-checked:bg-${this.systemService.color}-`
    );
    this.replaceClassName(
      'peer-checked:border-primary-',
      `peer-checked:border-${this.systemService.color}-`
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
    return schedule.attendance as IAttendance;
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
