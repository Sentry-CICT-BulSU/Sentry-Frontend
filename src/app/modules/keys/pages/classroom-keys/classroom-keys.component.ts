import { Component, OnInit } from '@angular/core';
import { IRoomKey } from 'src/app/core/models';
import { RoomKeyService } from 'src/app/core/services/roomkey.service';

@Component({
  selector: 'app-classroom-keys',
  templateUrl: './classroom-keys.component.html',
})
export class ClassroomKeysComponent implements OnInit {
  roomKeys?: IRoomKey[];
  constructor(private roomKeyService: RoomKeyService) {}
  ngOnInit() {
    this.initComponent();
    this.loadRoomKeys();
  }

  loadRoomKeys() {
    this.roomKeyService.getRoomKeys$().subscribe({
      next: (roomKeys) => {
        console.log(roomKeys);
        this.roomKeys = roomKeys.data as IRoomKey[];
      },
    });
  }

  filterRoomKey(available: boolean) {
    if (!this.roomKeys) return;
    return this.roomKeys?.filter((roomKey) => {
      if (roomKey.status === 'Available' && available) {
        return true;
      } else if (roomKey.status === 'In Use' && !available) {
        return true;
      }
      return false;
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
