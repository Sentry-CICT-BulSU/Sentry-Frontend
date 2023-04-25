import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRoom, IRoomCollection } from 'src/app/core/models';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
})
export class RoomListComponent implements OnInit {
  roomCollection?: IRoomCollection;
  roomActiveCollection?: IRoomCollection;
  roomInactiveCollection?: IRoomCollection;

  rooms?: IRoom[];
  activeRooms?: IRoom[];
  inactiveRooms?: IRoom[];

  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit(): void {
    this.initComponent();
    this.loadAll();
    this.loadActive();
    this.loadInactive();
  }

  onEdit(id: number) {
    console.log('edit room');
  }
  onDelete(id: number) {
    console.log('delete room');
    this.roomService.deleteRoom$(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/room']);
      },
    });
  }

  loadAll() {
    this.roomService.loadRooms$().subscribe((rooms) => {
      this.roomCollection = rooms;
      this.rooms = rooms.data as IRoom[];
      console.debug('all rooms', rooms);
    });
  }
  loadActive() {
    const qParam = { q: 'active' };
    this.roomService.loadRooms$(qParam).subscribe((rooms) => {
      this.roomActiveCollection = rooms;
      this.activeRooms = rooms.data as IRoom[];
      console.debug('active rooms', rooms);
    });
  }
  loadInactive() {
    const qParam = { q: 'inactive' };
    this.roomService.loadRooms$(qParam).subscribe((rooms) => {
      this.roomInactiveCollection = rooms;
      this.inactiveRooms = rooms.data as IRoom[];
      console.debug('inactive rooms', rooms);
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
