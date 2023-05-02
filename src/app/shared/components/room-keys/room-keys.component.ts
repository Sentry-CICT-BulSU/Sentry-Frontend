import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IRoomKey,
  IRoomKeyCollection,
  IRoomKeyLog,
  IRoomKeyLogCollection,
} from 'src/app/core/models';
import { RoomKeyLogsService } from 'src/app/core/services/roomkey-logs.service';
import { RoomKeyService } from 'src/app/core/services/roomkey.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-room-keys',
  templateUrl: './room-keys.component.html',
})
export class RoomKeysComponent implements OnInit {
  roomKeyCollection?: IRoomKeyCollection;
  roomKeys?: IRoomKey[];
  roomKeyLogs?: IRoomKeyLog[];
  roomKeyLogCollection?: IRoomKeyLogCollection;
  availableKeys?: any;
  constructor(
    private roomKeySerivce: RoomKeyService,
    private roomKeyLogsService: RoomKeyLogsService,
    private router: Router,
    public systemService: SystemService
  ) {}

  ngOnInit(): void {
    this.initSystemColor();
    this.loadRoomInfo();

  }

  initSystemColor() {
    const color = this.systemService.color;
    console.log('system color: ', color);
    this.replaceClassName('bg-primary-', `bg-${this.systemService.color}-`);
    this.replaceClassName('text-primary-', `text-${this.systemService.color}-`);
    this.replaceClassName('border-primary-', `border-${this.systemService.color}-`);
    this.replaceClassName('ring-primary-', `ring-${this.systemService.color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${this.systemService.color}-`);
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

  loadRoomInfo() {
    this.roomKeySerivce.getRoomKeys$().subscribe((roomKeys) => {
      this.roomKeyCollection = roomKeys as IRoomKeyCollection;
      this.roomKeys = this.roomKeyCollection.data as IRoomKey[];
      console.log(roomKeys);
    });
    this.roomKeyLogsService.getRoomKeyLogs$().subscribe((roomKeyLogs) => {
      this.roomKeyLogCollection = roomKeyLogs;
      this.roomKeyLogs = roomKeyLogs.data as IRoomKeyLog[];
      console.log(roomKeyLogs);
    });
    this.roomKeyLogsService
      .getAvailableRoomKeys$()
      .subscribe((response) => (this.availableKeys = response));
  }
}
