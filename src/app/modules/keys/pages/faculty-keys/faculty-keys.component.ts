import { Component, OnInit } from '@angular/core';
import { IRoomKey, IRoomKeyCollection } from 'src/app/core/models';
import { RoomKeyService } from 'src/app/core/services/roomkey.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-faculty-keys',
  templateUrl: './faculty-keys.component.html',
})
export class FacultyKeysComponent implements OnInit {
  roomKeys?: IRoomKey[];
  roomKeysCollection?: IRoomKeyCollection;
  constructor(private roomKeysService: RoomKeyService, public systemService: SystemService) {}
  ngOnInit() {
    this.initComponent();
    this.loadRoomKeys();
  }

  fillterRoomKeys(status: string) {
    if (!this.roomKeys) return [];
    return this.roomKeys.filter((rk) => rk.status === status);
  }

  loadRoomKeys() {
    this.roomKeysService.getRoomKeys$().subscribe({
      next: (roomKeys) => {
        this.roomKeysCollection = roomKeys;
        this.roomKeys = roomKeys.data as IRoomKey[];
        console.log(roomKeys);
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
