import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IRoom, ISchedule, IScheduleCollection } from 'src/app/core/models';
import { RoomService } from 'src/app/core/services/room.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';

@Component({
  selector: 'app-room-information',
  templateUrl: './room-information.component.html',
})
export class RoomInformationComponent implements OnInit {
  schedulesCollection?: IScheduleCollection;
  schedules?: ISchedule[];
  roomName?: string;
  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {}
  ngOnInit(): void {
    this.initComponent();
    this.loadSchedules();
  }

  loadSchedules() {
    this.route.queryParams.subscribe((params) => {
      const sid = params['sid'];
      const rid = params['rid'];
      if (sid && rid && +sid && +rid) {
        forkJoin([
          this.scheduleService.loadSchedules$({ rid: +rid }),
          this.roomService.loadRoom$(+rid),
        ]).subscribe({
          next: ([schedule, room]) => {
            console.log(schedule);
            this.schedulesCollection = schedule;
            this.schedules = schedule.data as ISchedule[];
            this.roomName = (room.data as IRoom).name;
          },
          error: (err) => console.debug(err),
        });
      }
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
