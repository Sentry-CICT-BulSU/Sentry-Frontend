import { Component, OnInit } from '@angular/core';
import { ISchedule, IScheduleCollection } from 'src/app/core/models';
import { ScheduleService } from 'src/app/core/services/schedule.service';

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
  constructor(private schedulleService: ScheduleService) {}
  ngOnInit(): void {
    this.initComponent();
    this.loadSchedules();
  }

  loadSchedules() {
    this.schedulleService.loadSchedules$().subscribe((schedules) => {
      this.schedulesCollection = schedules;
      this.schedules = schedules.data as ISchedule[];
      console.log(schedules);
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
}
