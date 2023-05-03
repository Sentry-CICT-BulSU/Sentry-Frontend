import {
  IAvailableKeys,
  IRoomKeyLog,
  IRoomKeyLogCollection,
} from 'src/app/core/models';
import { RoomKeyLogsService } from './../../../../core/services/roomkey-logs.service';
// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

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

  getStatusClass(status: string): string {
    return status === 'Returned'
      ? 'bg-green-500/25 text-green-500'
      : 'bg-blue-300/25 text-blue-500 dark:text-blue-300';
  }

  ngOnInit(): void {
    // comment below for frontend
    forkJoin([
      this.roomKeyLogsService.getRoomKeyLogs$(),
      this.roomKeyLogsService.getAvailableRoomKeys$(),
    ]).subscribe({
      next: ([roomKeyLogs, roomKeys]) => {
        console.log(roomKeyLogs);
        console.log(roomKeys);
        this.roomKeyLogCollection = roomKeyLogs;
        this.roomKeyLogs = roomKeyLogs.data as IRoomKeyLog[];
        this.availableKeys = roomKeys;
      },
      error: (err) => console.debug(err),
    });
  }
}
