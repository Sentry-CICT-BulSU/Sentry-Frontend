import { Component, OnInit } from '@angular/core';
import { RoomKeyLogsService } from 'src/app/core/services/roomkey-logs.service';
import { IRoomKeyLog, IRoomKeyLogCollection } from 'src/app/core/models';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  roomKeyLogs?: IRoomKeyLog[];
  roomKeyLogsCollection?: IRoomKeyLogCollection;
  // Defining a constructor for the DashboardComponent class
  constructor(private roomKeyLogsService: RoomKeyLogsService) {}

  // Implementing the ngOnInit lifecycle hook
  ngOnInit(): void {
      this.roomKeyLogsService
          .getRoomKeyLogs$()
          .subscribe((logs: IRoomKeyLogCollection) => {
              this.roomKeyLogsCollection = logs;
              if (
                  this.roomKeyLogsCollection.data &&
                  Array.isArray(this.roomKeyLogsCollection.data)
              ) {
                  this.roomKeyLogs = this.roomKeyLogsCollection.data;
              }
              console.debug('Room Key Logs', this.roomKeyLogs);
              console.debug(
                  'Room Key Logs Collection',
                  this.roomKeyLogsCollection
              );
          });
  }
}
