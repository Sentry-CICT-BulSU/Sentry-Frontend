import { Component, OnInit } from '@angular/core';
import { IScheduleCollection } from 'src/app/core/models/schedule.model';
import { ScheduleService } from 'src/app/core/services/schedule.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
})
export class ScheduleListComponent implements OnInit {
  schedules?: IScheduleCollection;
  isMultiPage?: boolean;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.initComponent();
    this.scheduleService.loadSchedules$().subscribe({
      next: (schedules) => {
        console.log(schedules);
        this.schedules = schedules;
      },
      error: (err) => {
        console.debug(err);
      },
    });
  }

  initComponent() {
    const tabLinks = document.querySelectorAll(
      '.tab-link'
    ) as NodeListOf<HTMLAnchorElement>;
    const tabContents = document.querySelectorAll(
      '.tab-content'
    ) as NodeListOf<HTMLElement>;

    // Set Personal Information as default active tab
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

  pageMaxCount() {
    return new Array(this.schedules?.meta?.last_page);
  }
}
