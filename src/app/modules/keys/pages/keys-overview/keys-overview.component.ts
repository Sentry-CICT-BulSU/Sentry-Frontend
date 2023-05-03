import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { IRoomKeyLog, IRoomKeyLogCollection } from 'src/app/core/models';
import { RoomKeyLogsService } from 'src/app/core/services/roomkey-logs.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-keys-overview',
  templateUrl: './keys-overview.component.html',
})
export class KeysOverviewComponent implements OnInit {
  keyLogs?: IRoomKeyLog[];
  keyLogsCollection?: IRoomKeyLogCollection;
  keyLogsReturned?: IRoomKeyLog[];
  keyLogsReturnedCollection?: IRoomKeyLogCollection;
  keyLogsBorrowed?: IRoomKeyLog[];
  keyLogsBorrowedCollection?: IRoomKeyLogCollection;
  keyLogsLost?: IRoomKeyLog[];
  keyLogsLostCollection?: IRoomKeyLogCollection;
  constructor(private keyLogsService: RoomKeyLogsService, public systemService: SystemService) {}

  p = 1;

  ngOnInit() {
    this.initComponent();
    this.loadRoomKeyLogs()
  }

  loadRoomKeyLogs() {
    forkJoin([
      this.keyLogsService.getRoomKeyLogs$(),
      this.keyLogsService.getRoomKeyLogs$({ q: 'Returned' }),
      this.keyLogsService.getRoomKeyLogs$({ q: 'Borrowed' }),
      this.keyLogsService.getRoomKeyLogs$({ q: 'Lost' }),
    ]).subscribe({
      next: ([all, returned, borrowed, lost]) => {
        console.log(all, returned, borrowed, lost);
        this.keyLogs = all.data as IRoomKeyLog[];
        this.keyLogsCollection = all;
        this.keyLogsReturned = returned.data as IRoomKeyLog[];
        this.keyLogsReturnedCollection = returned;
        this.keyLogsBorrowed = borrowed.data as IRoomKeyLog[];
        this.keyLogsBorrowedCollection = borrowed;
        this.keyLogsLost = lost.data as IRoomKeyLog[];
        this.keyLogsLostCollection = lost;
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
}
