import { Component, OnInit } from '@angular/core';
import { concatMap, forkJoin, of } from 'rxjs';
import { IAttendance, IRoomKeyLog, ISchedule } from 'src/app/core/models';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoomKeyLogsService } from 'src/app/core/services/roomkey-logs.service';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-faculty-dashboard',
  templateUrl: './faculty-dashboard.component.html',
})
export class FacultyDashboardComponent implements OnInit {
  roomKeyLogs?: IRoomKeyLog[];
  attendances?: IAttendance[];
  constructor(
    private keyLogsService: RoomKeyLogsService,
    private attendanceService: AttendanceService,
    private authService: AuthService,
    public systemService: SystemService
  ) {}

  p = 1;

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.authService.current_user_subject$
      ?.pipe(
        concatMap((user) =>
          user
            ? forkJoin([
                this.keyLogsService.getRoomKeyLogs$(),
                this.attendanceService.loadAttendance$(user.id),
              ])
            : of([null, null])
        )
      )
      .subscribe(([keyLogs, attendances]) => {
        if (keyLogs && attendances) {
          console.log(keyLogs, attendances);
          this.roomKeyLogs = keyLogs.data as IRoomKeyLog[];
          this.attendances = attendances.data as IAttendance[];
        }
      });
  }
}
