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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRoomInfo();
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
