import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRoom, IRoomCollection } from 'src/app/core/models';
import { RoomService } from 'src/app/core/services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
})
export class RoomListComponent implements OnInit {

  public searchTerm = '';

  p = 1;

  selectedSort = 'latest';

  currentSortType!: string;

  roomCollection?: IRoomCollection;
  roomActiveCollection?: IRoomCollection;
  roomInactiveCollection?: IRoomCollection;

  rooms?: IRoom[];
  activeRooms?: IRoom[];
  inactiveRooms?: IRoom[];

  get filteredSearchRooms() {
    if (!this.rooms) {
      return [];
    }
    return this.rooms.filter(room => {
      return room.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             room.location.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  get filteredSearchActiveRooms() {
    if (!this.activeRooms) {
      return [];
    }
    return this.activeRooms.filter(room => {
      return room.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             room.location.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }


  get filteredSearchInactiveRooms() {
    if (!this.inactiveRooms) {
      return [];
    }
    return this.inactiveRooms.filter(room => {
      return room.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             room.location.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }


  // sortRooms(rooms: any[], sortParam: string): any[] {
  //   return rooms.sort((a, b) => {
  //     if (sortParam === 'name') {
  //       return a.name.localeCompare(b.name);
  //     } else if (sortParam === 'date') {
  //       return new Date(b.modified_at).getTime() - new Date(a.modified_at).getTime();
  //     } else {
  //       return 0;
  //     }
  //   });
  // }

  sortRooms(rooms: any[], sortParam: string): any[] {
    return rooms.sort((a, b) => {
      if (sortParam === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortParam === 'latest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortParam === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return 0;
      }
    });
  }

  sortActiveRooms(activeRooms: any[], sortParam: string): any[] {
    return activeRooms.sort((a, b) => {
      if (sortParam === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortParam === 'latest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortParam === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return 0;
      }
    });
  }

  sortInactiveRooms(inactiveRooms: any[], sortParam: string): any[] {
    return inactiveRooms.sort((a, b) => {
      if (sortParam === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortParam === 'latest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortParam === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return 0;
      }
    });
  }










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
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this room?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6941C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {

        console.log('delete room');
    this.roomService.deleteRoom$(id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/room']);
      },
    });
        Swal.fire('Deleted!', 'Room has been deleted.', 'success');
      }
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

  getRoomStatusClass(status: string): string {
    return status === 'active' ? 'bg-green-500/25 text-green-500' : 'bg-gray-300/25 text-gray-500 dark:text-gray-300';
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
