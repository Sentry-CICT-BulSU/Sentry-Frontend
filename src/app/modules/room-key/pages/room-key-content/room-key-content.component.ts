import {
  IAvailableKeys,
  IRoomKeyLog,
  IRoomKeyLogCollection,
} from 'src/app/core/models';
import { RoomKeyLogsService } from './../../../../core/services/roomkey-logs.service';
// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
  selector: 'app-room-key-content',
  templateUrl: './room-key-content.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class RoomKeyContentComponent implements OnInit {
  roomKeyLogs?: IRoomKeyLog[];
  roomKeyLogCollection?: IRoomKeyLogCollection;
  availableKeys: IAvailableKeys = {
    available: 0,
    available_percentage: 0,
    unavailable: 0,
    unavailable_percentage: 0,
    total_keys: 0,
  };
  constructor(private roomKeyLogsService: RoomKeyLogsService) {}

  ngOnInit(): void {
    // comment below for frontend
    this.roomKeyLogsService.getRoomKeyLogs$().subscribe((roomKeyLogs) => {
      this.roomKeyLogCollection = roomKeyLogs;
      this.roomKeyLogs = roomKeyLogs.data as IRoomKeyLog[];
      console.log(roomKeyLogs);
    });
    this.roomKeyLogsService.getAvailableRoomKeys$().subscribe((response) => {
      this.availableKeys = response;
      console.log(response);
    });
  }
}
