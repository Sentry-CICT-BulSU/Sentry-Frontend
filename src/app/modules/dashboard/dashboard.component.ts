// Importing necessary modules from @angular
import { Component, OnInit } from '@angular/core';
import { IRoomKeyLog, IRoomKeyLogCollection } from 'src/app/core/models';
import { RoomKeyLogsService } from 'src/app/core/services/roomkey-logs.service';

// Defining a new component with the selector 'app-dashboard' and the template URL 'dashboard.component.html'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

// Exporting the DashboardComponent class and implementing the OnInit interface
export class DashboardComponent implements OnInit {
  roomKeyLogs?: IRoomKeyLog[];
  roomKeyLogsCollection?: IRoomKeyLogCollection;
  logIsEmpty = false;
  // Defining a constructor for the DashboardComponent class
  constructor(private roomKeyLogsService: RoomKeyLogsService) {}

  // Implementing the ngOnInit lifecycle hook
  ngOnInit(): void {
    this.roomKeyLogsService.getRoomKeyLogs$().subscribe({
      next: (logs: IRoomKeyLogCollection) => {
        this.roomKeyLogsCollection = logs;
        this.roomKeyLogs = this.roomKeyLogsCollection.data as IRoomKeyLog[];
        this.logIsEmpty = this.roomKeyLogs.length === 0;
        console.debug('Room Key Logs', this.roomKeyLogs);
        console.debug('Room Key Logs Collection', this.roomKeyLogsCollection);
        console.debug('Room Key Logs is empty', this.logIsEmpty);
      },
    });
  }
}
