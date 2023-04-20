import { Component, OnInit } from '@angular/core';
import { IRoomCollection } from 'src/app/core/models';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
})
export class RoomListComponent implements OnInit {
    roomCollection?: IRoomCollection;
    constructor(private roomService: RoomService) {}

    ngOnInit(): void {
        this.initComponent();
        this.roomService.loadRooms$().subscribe((rooms) => {
            this.roomCollection = rooms;
            console.log(rooms);
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
                (
                    document.querySelector(selectedTab) as HTMLElement
                ).classList.add('active');
            });
        });
    }
}
